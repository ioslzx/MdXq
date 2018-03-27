// pages/personalCenter/totalOrder/totalOrder.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
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
    currentID: 2,
    customer_id: null,
    orderListInfo: [],
    orderDetail: [],
    orderDetailLength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取待收货
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + 10030 + '&_query.payment_state=1&_query.logistics_state=1';
      this.getOrderListInfo(orderListUrl)
  },
  // 待付款页面取消订单
  cancleOrder(e) {
    console.log(e)
    var order_id = e.currentTarget.dataset.order_id
    var url = baseUrl + '/api/order/cancel?order_id=' + order_id
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
          wx.showToast({
            title: '取消订单成功',
          })
        } else {
          wx.showToast({
            title: '取消订单失败',
          })
        }
      }
    })
    // 获取待付款
    var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + 10030 + '&_query.payment_state=2' + '&_query.order_state=1';
    this.getOrderListInfo(orderListUrl)
  },
  // 提醒发货点击事件
  goRemind(e) {
    wx.showToast({
      title: '提醒发货成功',
    })
  },
  // 待付款页面付款点击事件
  pay(e) {
    console.log(e)
  },
  // 待收货确认收货点击事件
  confirmReceipt(e) {
    console.log(e)
    var order_id = e.currentTarget.dataset.order_id
    var url = baseUrl + '/api/order/confirm-receipt?order_id=' + order_id
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
    // 获取待收货
    var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + 10030 + '&_query.payment_state=1&_query.logistics_state=1';
    this.getOrderListInfo(orderListUrl)
  },
  // 点击导航事件
  goSelectNav: function (e) {
    var currentID = e.currentTarget.dataset.currentid;
    this.setData({
      currentID: currentID,
      orderListInfo: []
    })
    if (this.data.currentID == 3) {
      // 获取全部订单列表
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + 10030;
      this.getOrderListInfo(orderListUrl)
    } else if (this.data.currentID == 2) {
      // 获取待收货
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + 10030 + '&_query.payment_state=1&_query.logistics_state=1';
      this.getOrderListInfo(orderListUrl)
      // console.log(orderListUrl)
    } else if (this.data.currentID == 1) {
      // 获取待发货
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + 10030 + '&_query.payment_state=1&_query.logistics_state=3';
      this.getOrderListInfo(orderListUrl)
    } else {
      // 获取待付款
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + 10030 + '&_query.payment_state=2' + '&_query.order_state=1';
      // console.log(orderListUrl)
      this.getOrderListInfo(orderListUrl)
    }
  },
  // 获取订单列表信息方法
  getOrderListInfo(url) {
    var that = this;
    wx.request({
      url: url,
      success(res) {
        if (res.data.success) {
          // console.log(res.data)
          var data = res.data.result.rows;
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].orderDetail.length; j++) {
              data[i].orderDetail[j].mallProduct.exhibition = imgUrl + data[i].orderDetail[j].mallProduct.exhibition;
              that.setData({
                orderDetail: data[i].orderDetail,
                orderDetailLength: that.data.orderDetail.length
              })
            }
          }
          // console.log(that.data.orderDetail)
          that.setData({
            orderListInfo: data
          })
          // console.log(that.data.orderListInfo)
        } else {
          // wx.showModal({
          //   title: '提示',
          //   content: '暂无数据',
          // })
        }
      },
      fail(error) {
        console.log(error)
      }
    })
  },
  // 点击去订单详情
  goOrderDetail(e) {
    var order_id = e.currentTarget.dataset.order_id;
    var currentID = e.currentTarget.dataset.currentid;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?order_id=' + order_id + '&currentID=' + currentID
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