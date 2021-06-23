// app.js
App({
  globalData: {
    userInfo: {},
    hasUserInfo: false,
    token:"",
    hastoken:false,
    jsCode:"",
    url: 'http://testlove.cn:8081',
    userId:0,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
})