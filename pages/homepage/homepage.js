// pages/homepage/homepage.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;

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
    // 爆品数组
    hotGoodsInfo:[],
    // 为你推荐数组
    recommendGoodsInfo:[],
    // 头部轮播图数组
    topBannerInfo:[],
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
    this.getHotGoods(baseUrl +'/api/product/hot?shop_id=10000')
    this.getRecommendGoods(baseUrl +'/api/product/recommend?shop_id=10000&recommend_id=4')
    this.getTopBanner(baseUrl +'/api/banner/load-list?shop_id=10000&state=1')  
  },
  // 获取顶部轮播图数据
  getTopBanner(url){
    var that = this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var data = res.data.result;
          for (var i = 0; i < data.length;i++){
            data[i].picture = imgUrl + data[i].picture
            that.setData({
              topBannerInfo: res.data.result
            })
          }
          console.log(that.data.topBannerInfo)
        }
      }
    })
  },
  //获取为你推荐数据
  getRecommendGoods(url){
    var that = this
    wx.request({
      url: url,
      success(res){
        // console.log(res)
        if(res.data.success){
          var data = res.data.result;
          for(var i = 0;  i < data.length;i++){
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              recommendGoodsInfo: data
            })
          }
          // console.log(that.data.recommendGoodsInfo)
        }
      }
    })
  },
  // 获取今日爆品数据
  getHotGoods(url){
    var that = this;
    wx.request({
      url: url,
      success(res){
        // var data = res.data.result
        // console.log(res)
        if(res.data.success){
          var data = res.data.result;
          for (var i = 0; i < data.length;i++){
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              hotGoodsInfo: data
            })
          }
        }
      },fail(error){

      }
    })
  },
  goNewGoods(e){
      wx.navigateTo({
        url: '../buyNewGoods/buyNewGoods',
      })
  },
  goProductDetail(e){
    console.log(e);
    var product_id = e.currentTarget.dataset.product_id;
    wx.navigateTo({
      url: '../productDetails/productDetails?product_id=' + product_id,
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