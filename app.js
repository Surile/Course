//app.js
var app = getApp()
var config = require('utils/config.js')
var util = require('utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfoFs: function () {
    // var that = this;
    // wx.getSetting({
    //   success: (res) => {
    //     console.info(res.authSetting);
    //     wx.getUserInfo({
    //       success: res => {
    //         this.globalData.userInfo = res.userInfo
    //         console.info("一开始同意授权" + res.userInfo.nickName);
    //         if (this.userInfoReadyCallback) {
    //           this.userInfoReadyCallback(res)
    //         }
    //       },
    //       fail(err) {
    //         console.info(err.errMsg);
    //       }
    //     })
    //   }
    // })
    wx.showModal({
      title: '登录授权',
      cancelText: '不授权',
      confirmText: '授权',
      confirmColor: '#37C31A',
      content: '若不授权微信登录，则无法预约课程',
      success: function (res) {
        if (res.confirm) {
          // 登录
          wx.login({
            success: res => {
              // ------ 获取凭证 ------
              var code = res.code;
              if (code) {
                var url = config.api.registered
                var params = { 'code': code }
                util.getData(url, params).then(function (res) {
                  if (res.data.code == "200" || res.data.code == "0") {
                    var memberId = res.data.data.id
                    var memberId1 = res.data.data.memberId
                    if (memberId != '') {
                      var mobile = res.data.data.mobile
                      wx.setStorageSync('memberId', memberId)
                      wx.setStorageSync('mobile', mobile)
                    } else if (memberId1 != '') {
                      var mobile = res.data.data.mobile
                      wx.setStorageSync('memberId', memberId1)
                      wx.setStorageSync('mobile', mobile)
                    } else {
                      wx.showToast({
                        title: '登录失败',
                      })
                    }
                  }
                })
              } else {
                console.log('获取用户登录失败：' + res.errMsg);
              }
            }
          })
        } else if (res.cancel) {
          console.log('弹出框用户点击取消')
        }
      }
    })
  },
  userLogin:function(){
    
  },
  

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})