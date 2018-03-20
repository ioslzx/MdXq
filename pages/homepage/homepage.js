// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // touchMovingLeft: false,
    // touchMovingRight: false,
    // moveLeft: 0,
    // touchStart: 0,
    // touchMove: 0,
    // touchEnd: 0,
    swiperParam: {
      indicatorDots: true,
      indicatorColor: "#aaa",
      indicatorActiveColor: "#f1f1f1",
      autoplay: true,
      circular: true,
      interval: 3000
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  goNewGoods(e){
    console.log(e);
      wx.navigateTo({
        url: '../buyNewGoods/buyNewGoods',
      })
  },
  goProductDetail(e){
    wx.navigateTo({
      url: '../productDetails/productDetails',
    })
  },
  recommendGoProductDetail(e){
    wx.navigateTo({
      url: '../productDetails/productDetails',
    })
  },
  // 触摸开始
  touchstart: function (event) {

    var touchStart = event.touches[0].pageX;
    this.setData({
      touchStart: touchStart
    })
    console.log(event)
  },
  // 触摸结束
  touchend: function (event) {
    var touchEnd = event.changedTouches[0].pageX;
    this.setData({
      touchEnd: touchEnd
    })
    // console.log(touchEnd)
  },
  click(e){
    // console.log(e)
  },
  // 触摸移动

  touchmove: function (event) {
    var touchMove = event.touches[0].pageX;
    this.setData({
      touchMove: touchMove
    })
    // console.log(touchMove)
    if (this.data.touchStart > this.data.touchEnd) {
      this.setData({
        touchMovingLeft: true,
        touchMovingRight: false
      })
    } else {
      this.setData({
        touchMovingRight: true,
        touchMovingLeft: false
      })
    }
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