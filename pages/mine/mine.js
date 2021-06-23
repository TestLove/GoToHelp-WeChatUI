const app = getApp()
Page({
  onLoad: function (options) {
    this.setData({
      avatarUrl:app.globalData.userInfo.avatarUrl,//用户头像
      nickName:app.globalData.userInfo.nickName,//用户昵称
    })
  },

  exit:function(e){
    var taht=this;
    wx.showModal({
      title: '提示',
      content: '确定退出？',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
          wx.request({
            url: app.globalData.url+"/private/logout",
            method:'POST',
            header:{
              'content-type':'application/json',
              'token':app.globalData.token
            },
            data:{
              userId:app.globalData.userId
            },
            success:function(res){
            console.log(res);
            wx.reLaunch({
              url: '../login/login',
            })
            },
          fail:function(res){
            console.log("-----------fail-----------");
          }
          })
        } else {
          console.log('取消')
        }
      }
    })
  },

  data: {
    avatarUrl:'',//用户头像
    nickName:'',//用户昵称
  }
})
