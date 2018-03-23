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
    orderDetailsInfo:{},
    currentID:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取order_id
    this.setData({
      order_id: options.order_id,
      currentID: options.currentID*1
    })
    console.log(this.data.currentID)
    var orderDetailsInfoUrl = baseUrl + '/api/order/load?order_id=' + this.data.order_id;
    this.getOrderDetail(orderDetailsInfoUrl);
  },
  // 确认收货
  goConfirmReceipt(e){
    var url = baseUrl + '/api/order/confirm-receipt?order_id=' + this.data.order_id
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
          wx.showToast({
            title: '确认收货成功',
          })
        } else {
          wx.showToast({
            title: '确认收货失败',
          })
        }
      }
    })
    wx.navigateTo({
      url: '../totalOrder/totalOrder?orderDetailsID=2',
    })
    // wx.navigateBack({
    //   url:'../totalOrder/totalOrder?orderDetailsID=2',
    //   success: function (e) {
    //     var page = getCurrentPages().pop();
    //     if (page == undefined || page == null) return;
    //     page.onLoad();
    //   }
    // })

  },
  // 提醒发货
  goRemind(e){
    wx.showToast({
      title: '提醒发货成功',
    })
  },
  // 取消订单点击事件
  cancleOrder(e){
    var url = baseUrl + '/api/order/cancel?order_id=' + this.data.order_id
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '取消订单成功',
          })
          wx.navigateTo({
            url: '../totalOrder/totalOrder',
          })
          
        }
      }
    })
  },
  // 重新下单
  placingOrder(e){
    wx.switchTab({
      url: '../../category/category',
    })
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