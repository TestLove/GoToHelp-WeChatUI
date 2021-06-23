// pages/mine/update/update.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postid:0,
    posttitle:"",
    postcontents:"",
    type:"",
    contact:""
  },

    // 输入标题
    titleinput: function (e) {
      //console.log(e.detail.value);
      this.setData({
        posttitle:e.detail.value
      })
    },
      // 输入帖子内容
  contentinput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      postcontents : e.detail.value
    })
  },
    //输入电话号码
    telinput: function(e){
      this.setData({
        contact:e.detail.value
      })
    },
    // 确定按钮
  formSubmit: function (e) {
    console.log(e)
    
  },

  //修改帖子
post:function(e){
  var that = this
  if(that.data.posttitle!=''){
    wx.request({
      url: app.globalData.url+'/private/updatePost', //修改接口
      data: {
        'delete':0,
        'expired':0,
        'postContents':that.data.postcontents,
        'postTitle':that.data.posttitle,
        'userId':app.globalData.userId,
        'contact':that.data.contact,
        'type':that.data.type,
        'postId':that.data.postid
      },
      header: {
        'content-type':'application/json',
        token:app.globalData.token
        },
        method:"POST",
      success (res){
        const data = res.data
        console.log("postId:",that.data.postid)
        console.log("update:",data)
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            wx.reLaunch({
                url: '../../index/index'
            }) 
          }
        })
      }
    })
  
  }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var str = options.detail;
    var detail = str.split("|");
    this.setData({
      postid:parseInt(detail[0]),
      posttitle:detail[1],
      postcontents:detail[2],
      type:detail[3],
      contact:detail[4]
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