// pages/personalCenter/personalCenter.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture:'',
    nickname:'',
    level:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 获取个人信息
    wx.getStorage({
      key: 'picture',
      success: function(res) {
        that.setData({
          picture: res.data
        })
      },
    })
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          nickname: res.data
        })
      },
    })
    wx.getStorage({
      key: 'level',
      success: function (res) {
        that.setData({
          level: res.data
        })
      },
    })
  },
  // 点击去设置页
  goSettingsPage(e){
    wx.navigateTo({
      url: './personalSetting/personalSetting',
    })
  },
  // 点击去订单详情
  goOrderDetails(e){
    var orderDetailsID=e.currentTarget.dataset.orderdetailsid;
    if (orderDetailsID==0){
      wx.navigateTo({
        url: './totalOrder/totalOrder'
      })
    } else if (orderDetailsID==1){
      wx.navigateTo({
        url: './totalOrder1/totalOrder1'
      })
    } else if (orderDetailsID==2){
      wx.navigateTo({
        url: './totalOrder2/totalOrder2'
      })
    }else{
      wx.navigateTo({
        url: './totalOrder3/totalOrder3'
      })
    }
  },
  // 点击去优惠券
  goDiscountCoupon(e){
    wx.navigateTo({
      url: './discountCoupon/discountCoupon',
    })
  },
  // 点击我的拼团 
  groupBooking(e){
    wx.showModal({
      title: '提示',
      content: '暂未开通',
    })
  },
  // 点击去我的收藏
  goMyCollect(e){
    wx.navigateTo({
      url: './myCollect/myCollect',
    })
  },
  // 点击重置蜜豆币
  rechargeClick(e){
    wx.navigateTo({
      url: './recharge/recharge',
    })
  },
  // 点击联系客服
  contactCustomerService(e){
    wx.makePhoneCall({
      phoneNumber: '18993497639',
      success: function () {
        console.log('拨打成功')
      },
      fail: function () {
        console.log('拨打失败')
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