// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listsearch: [],
    arr:{
      fileUrl:[],
      postId:0,
      userId:app.globalData.userId,
      postTitle:"",
      postContents:"",
      contact:"",
      type:""
    },
    type:"",
    keyword: ""
    
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("onLoad is invoked");
    console.log(options);
    if(options.type!=undefined){
      that.setData({
      type:options.type
    })}
    
  },
 getSearchResult(keyword) {
   var that=this;
   if(that.data.type!=''){
    wx.request({
      url:app.globalData.url+'/private/selectPosts',
      data: {
        'keyword': that.data.keyword,
        'type':that.data.type
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'token':app.globalData.token
      },
      success: function (res) {
       console.log(res);
       that.setData({      
         listsearch: res.data   
       })
     },
     fail:function(res){
       console.log(res);
       that.setData({      
         listsearch: []   
       })
     }
   })
   }else{
    wx.request({
      url:app.globalData.url+'/private/selectPosts',
      data: {
        'keyword': that.data.keyword,
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'token':app.globalData.token
      },
      success: function (res) {
       console.log(res);
       that.setData({      
         listsearch: res.data   
       })
     },
     fail:function(res){
       console.log(res);
       that.setData({      
         listsearch: []   
       })
     }
   })
   }

  },

 //输入关键字
handleInputChange: function (e) {
  //console.log(e.detail.value);
  this.setData({
    keyword:e.detail.value,
  })
},
handleSearch (keyword) {
  this.getSearchResult(keyword)
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

  }
})