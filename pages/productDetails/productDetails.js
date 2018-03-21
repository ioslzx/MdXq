// pages/productDetails/productDetails.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 产品图片轮播图
    imgUrlInfo:[],
    // 产品信息
    productDetailsInfoObj:{},
    swiperParam:{
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
    var product_id = options.product_id
    console.log(product_id)
    this.getProductDetail(baseUrl + '/api/product/load?product_id=' + product_id)
  },
  // 获取商品详情数据
  getProductDetail(url){
    var that = this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var data = res.data.result;

          // console.log(that.data.imgUrlInfo)
          // 轮播图
          var imgUrlInfo = [];
          for (var i = 0; i < data.banner_diagram.split(',').length;i++){
            var imgUrlInfoObj={};
            imgUrlInfoObj={
              imgurl :imgUrl + data.banner_diagram.split(',')[i]
            }
            imgUrlInfo.push(imgUrlInfoObj)
            that.setData({
              imgUrlInfo: imgUrlInfo
            })
          }
          // console.log(that.data.imgUrlInfo)
          // 产品信息
          var productDetailsInfoObj = {
            product_id: data.product_id,
            product_name: data.product_name,
            member_price: data.member_price,
            market_price: data.market_price,
            vip_price: data.vip_price,
            sales_volume: data.sales_volume,
            // spec: data.spec,
            detail_diagram: data.detail_diagram

          }
          that.setData({
            productDetailsInfoObj:productDetailsInfoObj
          })
          console.log(that.data.productDetailsInfoObj)
        }
      },
      fail(error) {

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