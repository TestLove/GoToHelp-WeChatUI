const app = getApp()
Page({
  data: {
    list: [],
    postId:0,
    arr:{
      fileUrl:[],
      postId:0,
      userId:app.globalData.userId,
      postTitle:"",
      postContents:"",
      contact:"",
      type:""
    }
  },
onLoad:function(){
  var that=this;
  wx.request({
    url: app.globalData.url+'/private/selectPosts',
    method:'GET',
    data:{
      userId:app.globalData.userId
    },
    header:{
      'content-type':'application/json',
      'token':app.globalData.token
    },
    success:function(res){
      console.log(res);
      that.setData({
        list:res.data
      });
    },
    fail:function(res){
      console.log("-----------fail-----------");
    }
  })
},
  // 删除按钮点击事件
  delete:function(e){
    var taht=this;
    // 提示框
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
          wx.request({
            url: app.globalData.url+'/private/deletePost',
            method:'GET',
            data:{
              'postId':e.currentTarget.dataset.postid
            },
            header:{
              'content-type':'application/json',
              'token':app.globalData.token
            },
            success (res){
              const data = res.data
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000,
                success:function(){
                  wx.reLaunch({
                    url: '../../index/index'
                }) 
                }
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

  //修改按钮点击事件
  update:function(e){
    var postid = e.currentTarget.dataset.postid;
    var type = e.currentTarget.dataset.type;
    var posttitle = e.currentTarget.dataset.posttitle;
    var postcontents = e.currentTarget.dataset.postcontents;
    var contact = e.currentTarget.dataset.contact;

    wx.navigateTo({ 
      url: "../../../pages/mine/update/update?detail=" + postid + "|" + posttitle+ "|" +postcontents+ "|" +type+ "|" +contact
  })
  }


})