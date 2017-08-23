// pages/login/login.js
//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tip: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //调用API从本地缓存中获取数据
    // var openId = wx.getStorageSync('openIdx') || ''
    // console.log(openId)
    // if (openId != '') {
    //   wx.request({
    //     url: app.globalData.baseUrl + '/login/valLogin',
    //     method: 'POST',
    //     data: {
    //       openId: openId
    //     },
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     success: function (res) {
    //       if (res.data.resultCode > 0) {
    //         app.globalData.openId = res.data.openId,
    //           app.globalData.realName = res.data.realName,
    //           app.globalData.department = res.data.department,
    //           app.globalData.workNo = res.data.workNo
    //         wx.redirectTo({
    //           url: '../main/main',
    //         })
    //       }
    //     },
    //     fail: function () {
    //     }
    //   })
    // }
  },

  //提交登录信息
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.username.length == 0) {
      that.setData({
        tip: '提示：用户名不能为空！',
      })
    } else if (e.detail.value.pwd.length == 0) {
      that.setData({
        tip: '提示：密码不能为空！',
      })
    } else {
      wx.showLoading({
        title: '正在登录...',
      })

      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: app.globalData.baseUrl + '/login/toLogin', //仅为示例，并非真实的接口地址
              method: 'POST',
              data: {
                username: e.detail.value.username,
                pwd: e.detail.value.pwd,
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data)
                if (res.data.resultCode > 0) {
                  that.setData({
                    tip: '',
                  })
                  //存储openid
                  wx.setStorageSync('openIdx', res.data.openId)
                  app.globalData.openId = res.data.openId
                  app.globalData.realName = res.data.realName
                  app.globalData.workNo = res.data.workNo
                  app.globalData.department = res.data.department
                  wx.redirectTo({
                    url: '../index/index',
                  })
                } else {
                  that.setData({
                    tip: '用户名或密码错误！',
                  })
                }
                wx.hideLoading()

              },
              fail: function () {
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '服务器繁忙，请稍后重试',
                  showCancel: false
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '请先登录微信',
            showCancel: false
          })
        }
      });

    }
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
    //调用API从本地缓存中获取数据
    var openId = wx.getStorageSync('openIdx') || ''
    console.log(openId)
    if (openId != '') {
      wx.request({
        url: app.globalData.baseUrl + '/login/valLogin',
        method: 'POST',
        data: {
          openId: openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.resultCode > 0) {
            app.globalData.openId = res.data.openId,
              app.globalData.realName = res.data.realName,
              app.globalData.department = res.data.department,
              app.globalData.workNo = res.data.workNo
            wx.redirectTo({
              url: '../index/index',
            })
          }
        },
        fail: function () {
        }
      })
    }
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

  }
})