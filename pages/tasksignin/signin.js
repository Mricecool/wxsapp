// pages/tasksignin/signin.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    workId: '',
    taskName: '',
    fromSite: '',
    toSite: '',
    planStartTime: '',
    planEndTime: '',
    lat: '',
    lon: '',
    position: '',
    files: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workId: options.workId,
      taskName: options.taskName,
      fromSite: options.fromSite,
      toSite: options.toSite,
      planStartTime: options.planStartTime,
      planEndTime: options.planEndTime,
      position: app.globalData.address,
      lat: app.globalData.lat,
      lon: app.globalData.lon
    })
  },

  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.position.length == 0) {
      that.setData({
        tip: '提示：请先刷新当前位置！',
      })
    } else if (that.data.files.length == 0) {
      that.setData({
        tip: '提示：请上传图片！',
      })
    } else {
      wx.showLoading({
        title: '正在保存...',
      })


      wx.uploadFile({
        url: app.globalData.baseUrl + '/login/uploadFile',
        filePath: that.data.files[0],
        name: 'file',
        success: function (res) {
          var data = res.data

          wx.request({
            url: app.globalData.baseUrl + '/login/signIn',
            data: {
              workId: that.data.workId,
              lat: that.data.lat,
              lon: that.data.lon,
              address: that.data.position,
              image: data
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.resultCode > 0) {
                wx.showModal({
                  title: '提示',
                  content: '签到成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      // wx.redirectTo({
                      //   //目的页面地址
                      //   url: '../main/main'
                      // })
                      wx.navigateBack()
                    }
                  }
                })
              } else {
                that.setData({
                  tip: res.data.resultMsg,
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
  //事件处理函数
  checkLocation: function () {
    var that = this
    if (that.data.lat != "" && that.data.lon != "") {
      wx.openLocation({
        latitude: that.data.lat,
        longitude: that.data.lon
      })
    } else {
      that.setData({
        tip: '提示：请先刷新当前位置',
      })
    }
  },

  //事件处理函数
  delTask: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除此任务吗？',
      confirmText: '删除',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在操作...',
          })
          wx.request({
            url: app.globalData.baseUrl + '/login/delWork',
            method: 'POST',
            data: {
              workId: that.data.workId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.resultCode > 0) {
                wx.showModal({
                  title: '提示',
                  content: '删除成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack()
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '服务器繁忙，请稍后重试',
                  showCancel: false
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //事件处理函数
  refreshLocation: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserLocation(function (latitude, longitude, address) {
      //更新数据
      that.setData({
        position: address,
        lat: latitude,
        lon: longitude
      });
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})