var app=getApp()
Page({
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUseGetUserProfile: false,
  },
  submit:function(){
    if(app.globalData.hastoken){
      wx.switchTab({
      url: '../index/index',
    })
    }
  } ,
  onLoad() {
    wx.login({
      success: res=>{
        app.globalData.jsCode=res.code,
      wx.request({
        url: app.globalData.url+"/public/login/?jsCode="+app.globalData.jsCode,
        method:"POST",
        success:function(res) {
          app.globalData.userId=res.data.data.userId
          app.globalData.token=res.data.data.token
          app.globalData.hastoken=true
          console.log(app.globalData)
        },
        fail:function(res) {
          console.log(res)
        }
      }) 
      //发送 res.code 到后台换取 openId, sessionKey, unionId
     }
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
      
    }
  },
  getUserProfile(e) {
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        app.globalData.userInfo=res.userInfo,
        app.globalData.hasUserInfo=true,
        this.setData({
          hasUserInfo:true,
          userInfo:app.globalData.userInfo
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    app.globalData.userInfo=e.detail.userInfo,
    app.globalData.hasUserInfo=true,
    this.setData({
    userInfo: e.detail.userInfo,
    hasUserInfo: true
    })
  }
})
