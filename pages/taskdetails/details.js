// pages/taskdetails/details.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.baseUrl,
    workId: '',
    taskName: '',
    fromSite: '',
    toSite: '',
    planStartTime: '',
    planEndTime: '',
    signInSite: '',
    signInTime: '',
    signOutSite: '',
    signOutTime: '',
    signOutInfo:'',
    signInFiles: [],
    signOutFiles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var file1 = [];
    var file2 = [];
    if (options.signInImage != '') {
      file1 = options.signInImage.split(';')
      for (var i = 0; i < file1.length; i++) {
        file1[i] = app.globalData.baseUrl + file1[i];
      }
    }
    if (options.signOutImage != '') {
      file2 = options.signOutImage.split(';')
      for (var j = 0; j < file2.length; j++) {
        file2[j] = app.globalData.baseUrl + file2[j];
      }
    }


    this.setData({
      workId: options.workId,
      taskName: options.taskName,
      fromSite: options.fromSite,
      toSite: options.toSite,
      planStartTime: options.planStartTime,
      planEndTime: options.planEndTime,
      signInSite: options.signInSite,
      signInTime: options.signInTime,
      signOutSite: options.signOutSite,
      signOutTime: options.signOutTime,
      signOutInfo: options.signOutInfo,
      signInFiles: file1,
      signOutFiles: file2
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
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.signInFiles // 需要预览的图片http链接列表
    })
  },
  previewImage2: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.signOutFiles // 需要预览的图片http链接列表
    })
  }
})