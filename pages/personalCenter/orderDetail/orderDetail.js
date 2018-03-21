// pages/personalCenter/orderDetail/orderDetail.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:0,
    orderDetailsInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取order_id
    this.setData({
      order_id: options.order_id
    })
    // console.log(this.data.order_id)
    var orderDetailsInfoUrl = baseUrl + '/api/order/load?order_id=' + this.data.order_id;
    this.getOrderDetail(orderDetailsInfoUrl);
  },
  // 获取订单详情
  getOrderDetail(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        // console.log(res)
        if(res.data.success){
          var orderDetail=res.data.result.orderDetail;
          for (var i = 0; i < res.data.result.orderDetail.length;i++){
            res.data.result.orderDetail[i].mallProduct.exhibition = imgUrl + res.data.result.orderDetail[i].mallProduct.exhibition;
          }
          that.setData({
            orderDetailsInfo:res.data.result
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '数据加载失败',
          })
        }
      },
      fail(error){
        console.log(error)
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