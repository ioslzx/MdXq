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
    // 商品ID
    product_id:0,
    // 为你推荐数组
    recommendGoodsInfo: [],
    // 规格数量选择是否弹出
    isShowSizeAndAmount:false,
    quantity:1,
    model_id:1,
    mallProductModels:[],
    currentId:0,
    minusStatus: 'disabled',
    customer_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product_id:options.product_id
    })
    this.getProductDetail(baseUrl + '/api/product/load?product_id=' + this.data.product_id)
    this.getRecommendGoods(baseUrl + '/api/product/recommend?shop_id=10000&recommend_id=4')
  },
  // 点击减号按钮函数
  bindMinus: function (e) {
    // console.log(e)
    var quantity = this.data.quantity;
    if (quantity > 1) {
      quantity--;
    }
    var minusStatus = quantity <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity: quantity,
      minusStatus: minusStatus
    });
  },
  // 点击增加按钮函数
  bindPlus: function (e) {
    var quantity = this.data.quantity;
    quantity++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = quantity <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity: quantity,
      minusStatus: minusStatus
    });
  },
  // 改变选中的规格背景颜色
  chooseSize(e) {
    console.log(e)
    var currendID = e.currentTarget.dataset.id
    var model_ID = e.currentTarget.dataset.model_id
    this.setData({
      currentId: currendID,
      model_id: model_ID
    })
  },
  // 弹出规格数量选择窗口
  isShow(e){
    this.setData({
      isShowSizeAndAmount: !this.data.isShowSizeAndAmount
    })
  },
  //获取为你推荐数据
  getRecommendGoods(url) {
    var that = this
    wx.request({
      url: url,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          var data = res.data.result;
          for (var i = 0; i < data.length; i++) {
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
  // 加入购物车点击事件
  addShopppingCart: function (e){
    // console.log(this.data.product_id)
    var that=this;
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
        var url = baseUrl + '/api/shopping/cart/add?customer_id=' + that.data.customer_id + '&model_id=' + that.data.model_id + '&product_id=' + that.data.product_id + '&quantity=' + that.data.quantity
        wx.request({
          url: url,
          success(res) {
            // console.log(res)
            if (res.data.success) {
              wx.showToast({
                title: '成功加入购物车',
              })
            } else {
              wx.showToast({
                title: '加入购物车失败',
              })
            }
          }, fail(error) {

          }
        })
      },
    })
    
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
            detail_diagram: data.detail_diagram,
            mallProductModels: data.mallProductModels,
            stock_count: data.stock_count
          }
          that.setData({
            productDetailsInfoObj:productDetailsInfoObj,
            mallProductModels: data.mallProductModels,
            model_id: data.mallProductModels[0].model_id
          })
          // console.log(that.data.productDetailsInfoObj)
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