// pages/tabbar2/complexCalc/history/history.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // expr:"历史记录"
        exprs:[]
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options,'op ioi')
        // console.log('getloal',wx.getStorageSync('exprs'))
        this.setData({
            // expr: wx.getStorageSync('expr')
            exprs: wx.getStorageSync('exprs') || [],
            
        })
        try {
            wx.clearStorageSync()
        } catch (error) {
            console.log(error)
        }
        // console.log('getloal',wx.getStorageSync('exprs'))
    },

})
