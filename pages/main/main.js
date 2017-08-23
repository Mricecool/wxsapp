// pages/main/main.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workNo: '',
    realName: '',
    department: '',
    list: [],
    listEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      workNo: app.globalData.workNo,
      realName: app.globalData.realName,
      department: app.globalData.department
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
    this.getWorkList()
  },

  getWorkList: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/login/signList', //仅为示例，并非真实的接口地址
      data: {
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
            list: res.data
          })
        } else {

        }
        if (that.data.list.length == 0) {
          that.setData({
            listEmpty: true
          })
        } else {
          that.setData({
            listEmpty: false
          })
        }
      },
      fail: function () {
        wx.stopPullDownRefresh()
        if (that.data.list.length == 0) {
          that.setData({
            listEmpty: true
          })
        } else {
          that.setData({
            listEmpty: false
          })
        }
      }
    })
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
      list: []
    })
    this.getWorkList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //事件处理函数
  createTask: function () {
    wx.navigateTo({
      url: '../tasknew/new'
    })
  },
  //事件处理函数
  historyTask: function () {
    wx.navigateTo({
      url: '../taskhistory/history'
    })
  },
  //事件处理函数
  longTouch: function () {
    console.log('ddd')
    return false
  }
})