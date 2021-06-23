// pages/发帖/发帖.js
const app=getApp()
var imglength = 9;
var urlArr=[];
var imgfills=[];
var formSubmitdata;
var imgneturl = [];
var time;
var date;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array:[
      '失物招领',
      '寻物启事',
      '二手交易',
      '活动组队',
      '拼车'
    ],
    index: 0,
    content:"",
    title:"",
    files:[],
    contact:'',
  },
  url:"", 
  // 输入标题
  titleinput: function (e) {
    //console.log(e.detail.value);
    this.setData({
      title:e.detail.value
    })
  },
  // 输入帖子内容
  contentinput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      content : e.detail.value
    })
  },
  //输入电话号码
  telinput: function(e){
    this.setData({
      contact:e.detail.value
    })
  },
  // 选择图片
  addimg: function () {
    var that = this;
    wx.chooseImage({
      count: imglength,                   // 默认9
      sizeType: ['original ', 'compressed'],  // 默认二者都有
      sourceType: ['album', 'camera'],    // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths);
        imgfills = res.tempFilePaths;
        for (var i = 0; i < imgfills.length; i++) {
          urlArr.push(imgfills[i]);
        }
        that.setData({
          urlArr: urlArr
        })
        // console.log(urlArr)
        imglength = 9 - urlArr.length;
      }
    })
  },

   // 删除图片
   removeimg: function (e) {
    // console.log(e.target.id);
    var imgid = e.target.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否移除这张图片',
      success: function (res) {
        if (res.confirm) {
          urlArr.splice(imgid, 1)
          that.setData({
            urlArr: urlArr
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  //选择分类标签
  changeValue(e){
    this.setData(
      {index:e.detail.value}
    )
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    // 确定按钮
  formSubmit: function (e) {
    console.log(e)
    
  },


    
  //发表帖子
  post:function(e){
    var that = this
    console.log(imgfills)
    if(that.data.title!=''){
      if(imgfills.length!=0){
      wx.uploadFile({
        url: app.globalData.url+'/private/addPost', //发帖接口
        filePath: imgfills[0],
        name: 'files',
        formData: {
          'delete':0,
          'expired':0,
          'postContents':that.data.content,
          'postTitle':that.data.title,
          'userId':app.globalData.userId,
          'contact':that.data.contact,
          'type':that.data.array[that.data.index]
        },
        header: {
          'content-type':'application/x-www-form-urlencoded',
          token:app.globalData.token
          },
          method:"POST",
        success (res){
          const data = res.data
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            success:function(){
              wx.reLaunch({
                  url: '../index/index'
              }) 
            }
          })
        }
      })
    }else{
      wx.request({
        url: 'url',
        url: app.globalData.url+'/private/addPost', //发帖接口
        filePath: imgfills[0],
        data: {
          'delete':0,
          'expired':0,
          'postContents':that.data.content,
          'postTitle':that.data.title,
          'userId':app.globalData.userId,
          'contact':that.data.contact,
          'type':that.data.array[that.data.index],
          'filePath':''
        },
        header: {
          'content-type':'application/x-www-form-urlencoded',
          token:app.globalData.token
          },
          method:"POST",
        success (res){
          const data = res.data
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            success:function(){
              wx.reLaunch({
                  url: '../index/index'
              }) 
            }
          })
        }
      })
    }
    }
},



  // 表单
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var feedback = e.detail.value.feedback;
    formSubmitdata = e.detail.value
    if (feedback.length > 12) {
      this.imgudata()
    }

  },

  lodingto: function () {
    wx.showLoading({
      title: lodingtitile,
      icon: 'loading',

    })
  },

  closeloding: function () {
    wx.hideLoading()
  },

  tishikuang: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '网络错误，确认重试',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          that.requirenet()
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
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