const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    arr:{
      fileUrl:[],
      postId:0,
      userId:app.globalData.userId,
      postTitle:"",
      postContents:"",
      contact:"",
      type:"拼车",
      hasfileUrl:false
    },
    type:"拼车"
  },
  preview:function(e) {
    if(this.data.hasfileUrl){
      wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: this.data.list[parseInt(e.currentTarget.dataset.index)].fileUrl // 需要预览的图片http链接列表
    })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    wx.request({
      url: app.globalData.url+'/private/selectPosts',
      method:'GET',
      data: {
        'type':that.data.type
      },
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