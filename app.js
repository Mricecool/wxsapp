//app.js
var QQMapWX = require('/lib/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: '' // 必填
});

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var openId = wx.getStorageSync('openIdx') || ''
    console.log(openId)
    this.getUserLocation()
  },
  //获取用户位置信息
  getUserLocation:function(f){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        // 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            that.globalData.lat = latitude
            that.globalData.lon = longitude
            that.globalData.address = res.result.address
            typeof f == "function" && f(that.globalData.lat, that.globalData.lon,that.globalData.address)
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      },
      fail: function (res) {
        wx.openSetting({
          success: (res) => {
            console.log(res)
          }
        })
      },
    })
  },
  //获取用户信息
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  //全局数据
  globalData: {
    openId: '',
    realName: '',
    department: '',
    workNo: '',
    baseUrl: 'https://your server address',
    lat:'',
    lon:'',
    address:''
  }
})
