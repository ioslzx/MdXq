// pages/personalCenter/totalOrder/totalOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNavInfoArr: [
      {
        topNavInfoName: '待付款'
      },
      {
        topNavInfoName: '待发货'
      },
      {
        topNavInfoName: '待收货'
      },
      {
        topNavInfoName: '全部订单'
      }
    ],
    currentID:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取个人中心传递过来的orderDetailsID
    var orderDetailsID = options.orderDetailsID;
    this.setData({
      currentID: orderDetailsID
    })
  },
  // 点击导航事件
  goSelectNav: function (e) {
    var currentID = e.currentTarget.dataset.currentid;
    this.setData({
      currentID: currentID
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