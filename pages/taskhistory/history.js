// pages/taskhistory/history.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 0,
    pageSize: 10,
    isBottom: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryList()
  },

  getHistoryList: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/login/historyList', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.pageNum,
        pageSize: that.data.pageSize,
        openId: app.globalData.openId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res)
        if (res.data != null) {
          that.setData({
            list: that.data.list.concat(res.data),
            pageNum: that.data.pageNum + 1
          })
          if (res.data.length < 10) {
            that.setData({
              isBottom: true
            })
            console.log(that.data.list.length)
          }
        } else {
          that.setData({
            isBottom: true
          })
        }
      },
      fail: function () {
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    console.log("pulldown")
    that.setData({
      list: [],
      pageNum: 0,
      isBottom: false
    })
    this.getHistoryList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("bottom")
    var that = this
    if (!this.data.isBottom) {
      this.getHistoryList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})