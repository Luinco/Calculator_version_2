// pages/tabbar2/complexCalc/complexCalc.js

var calculate = function(data1,oper,data2){  //计算函数
    var data;
    data1 = parseFloat(data1);
    data2 = parseFloat(data2);
    switch(oper)
    {
        case "+":
            data = data1 + data2;
            break;
        case "-":
            data = data1 - data2;
            break;
        case "×":
            data = data1 * data2;
            break;
        case "÷":
            if(data2 !== 0){
                data = data1 / data2;
            }else{
                data = 0;
            }
            break;
    }
    return data;
}
//保存数据到本地缓存的数组中
var saveExprs = function (expr){
    var exprs = wx.getStorageSync('exprs') || [] //获取本地缓存
    exprs.unshift(expr); //在该数组开头增加一个元素
    wx.setStorageSync('exprs', exprs); //保存到本地存储
    console.log('exprs', exprs);
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: '0',
        temp: "0",
        history: 'history',     //历史
        clearnum: 'clearnum',    //清除
        back: 'back',//回退
        divide: 'divide',   //除
        id7: 'id7',
        id8: 'id8',
        id9: 'id9',
        multiply: 'multiply',   //乘
        id4: 'id4',
        id5: 'id5',
        id6: 'id6',
        subtract: 'subtract',   //减
        id1: 'id1',
        id2: 'id2',
        id3: 'id3',
        plus: 'plus',   //加
        negative: 'negative', //取负
        id0: 'id0',
        dot: 'dot', //小数点
        equal: 'equal', //等于
        lastoper: "+",
        flag: true,
        expr: '', //表达式
        record: true,

        // var1:"开",
        // var2:"关"
    },
    RecordHistory:function(e){
        console.log(e);
        this.setData({
            record: e.detail.value
        })
        try{
            wx.setStorageSync('key', 'value')
        }catch(e){
            console.log(e);
        }
    },
    // 单击事件处理函数
    clickButton:function(e){
        // console.log(e)
        // console.log(e.target.id)
        var data = this.data.result;            //获取上一个结果值
        var tmp = this.data.temp;              //取上次的临时结果
        var lastoper1 = this.data.lastoper;    //上一次的运算符
        var noNumFlag = this.data.flag;         //上一次的非数字按钮标志
        var expr1 = this.data.expr; //获取前面的表达式

        if(e.target.id >='id0' && e.target.id <='id9'){  //判断按钮按下的是否是数字键
            // console.log('你按的是'+ e.target.id)     //打印一下id数
            // console.log('你按的数字是'+ e.target.id.substr()[2]) //是则提取id后面的数字
            data += e.target.id.substr()[2]  //将拼接data和id 即输入的值
            // console.log( data,'datat1');
            if(this.data.result == '0' || noNumFlag){    //如果原先的值是0或者是非数字按钮，则用键入值代替
                data =  e.target.id.substr()[2]; 
            }
            noNumFlag = false;
        }else{ //不是数字按钮
            noNumFlag = true;
            // console.log('你按的控制键是'+e.target.id)
            if(e.target.id == "dot"){  //小数点-按钮
                noNumFlag = false;
                if(data.toString().indexOf(".") == -1){ //如果输入的值中不好含小数点，键入一个小数点
                    data += '.';
                }
            }
            else if(e.target.id == "clearnum"){  //清除按钮
                expr1 = expr1.substr(0,expr1.length-1) + '=' + tmp; //删除最后的运算符
                // if(this.data.record){
                //     wx.setStorageSync('expr', expr1)
                // }
                saveExprs(expr1);
                expr1 ="";
                data = 0; //数据清0
                tmp = 0; //清楚中间结果
                lastoper1 = "+" //设置上次的运算符为加
            }else if(e.target.id == "negative"){ //数字取负
                data = -1 * data;
            }else if(e.target.id == "back"){ //回退一个字符
                if(data.toString().length>1){ //长度超过1位数
                    data = data.substr(0,data.toString().length -1);  //去掉最后一位数
                }else{
                    data = 0; //置0
                }
            }else if(e.target.id == 'plus'){ //加法
                expr1 = data.toString() + "+";
                data = calculate(tmp,lastoper1,data);
                tmp = data;
                lastoper1 = "+";
            }else if(e.target.id == 'subtract'){ //减法
                expr1 += data.toString() + "-";     //生成表达式
                data = calculate(tmp,lastoper1,data)
                tmp = data;
                lastoper1 = "-";
            }else if(e.target.id == "multiply"){ //乘法
                expr1 += data.toString() + "×"; //生成表达式
                data = calculate(tmp,lastoper1,data)
                tmp = data;
                lastoper1 = "×";
            }else if(e.target.id == "divide"){ //除法
                expr1 += data.toString() + "÷"; //生成表达式
                data = calculate(tmp,lastoper1,data)
                tmp = data;
                lastoper1 = "÷";
            }else if(e.target.id == "equal"){ //等号
                expr1 += data.toString();       //生成表达式
                data = calculate(tmp,lastoper1,data)
                expr1 += "=" + data;       //生成表达式  
                // if(this.data.record){
                //     wx.setStorageSync('expr', expr1);
                // }
                saveExprs(expr1);
                expr1 = "";
                tmp = 0;
                lastoper1 = "+";
            }else if(e.target.id == "history"){
                console.log(wx.getStorageSync('exprs'),'wx.getStorageSync')
                wx.navigateTo({
                  url: '../history/history',
                })
            }
        }
        this.setData({  //更新结果值
            result:data,//更新的结果值
            lastoper: lastoper1,
            temp: tmp,
            flag: noNumFlag,
            expr: expr1
        })
        // console.log(this.data.result,'result')
    },   

})
