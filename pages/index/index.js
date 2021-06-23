const app = getApp()
Page({
  data: {
    list: {},
    hasfileUrl:false,
    show:false
  },
  
  preview:function(e) {
    if(this.data.hasfileUrl){
      wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: this.data.list[parseInt(e.currentTarget.dataset.index)].fileUrl // 需要预览的图片http链接列表
    })
    }
  },
onLoad:function(){
  
},
onshow:function(){
  this.setData({
      show:true
  })
},
onReady:function(){
  var that=this;
  wx.request({
    url: app.globalData.url+'/private/selectPosts',
    method:'GET',
    header:{
      'content-type':'application/json',
      'token':app.globalData.token
    },
    success:function(res){
      console.log(res);
      that.setData({
        list:res.data.data.data,
        hasfileUrl:true
      });
    },
    fail:function(res){
      console.log("-----------fail-----------");
    }
  })
}

})