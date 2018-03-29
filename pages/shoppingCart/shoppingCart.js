// pages/shoppingCart/shoppingCart.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quantity: 1,
    minusStatus: [],
    isShoppingCartNull:false,
    shoppingCartListInfo:[],
    cart_ids:'',
    // 为你推荐数组
    recommendGoodsInfo: [],
    customer_id:0,
    totalDelete:false,
    product_ids:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 跳转到商品详情
  goProductDetail(e) {
    console.log(e);
    var product_id = e.currentTarget.dataset.product_id;
    debugger
    wx.navigateTo({
      url: '../productDetails/productDetails?product_id=' + product_id,
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
  // 获取购物车列表
  getShoppingCartList(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var data=res.data.result;
          for(var i=0;i<data.length;i++){
            data[i].exhibition = imgUrl + data[i].exhibition;
            if (data[i].quantity <= 1){
              data[i].minusStatus ='disabled'
            }else{
              data[i].minusStatus = 'normal'
            }
          }
          that.setData({
            shoppingCartListInfo:data,
            isShoppingCartNull: false
          })
        }else{
          that.setData({
            isShoppingCartNull:true
          })
        }
      },
      fail(error){
        console.log(error)
      }
    })
  },
  // 点击减号按钮函数
  bindMinus:function(e){
    var that=this;
    var cart_id = e.currentTarget.dataset.cart_id;
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.shoppingCartListInfo.length; i++) {
      var quantity = that.data.shoppingCartListInfo[index].quantity;
      if (quantity>1){
        quantity--
      }else{
        quantity=1
      }
      that.bindManual(cart_id, quantity)
    }
  },
  // 点击增加按钮函数
  bindPlus: function (e) {
    var that = this;
    var cart_id = e.currentTarget.dataset.cart_id;
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.shoppingCartListInfo.length; i++) {
      var quantity = that.data.shoppingCartListInfo[index].quantity++;
      that.bindManual(cart_id, quantity)
    }
  },
  // 获取修改数量
  bindManual(cart_id, quantity){
    var that=this;
    var quantityUrl = baseUrl + '/api/shopping/cart/edit?cart_id=' +
      cart_id + '&quantity=' + quantity;
    wx.request({
      url: quantityUrl,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          var shoppingCartListUrl = baseUrl + '/api/shopping/cart/load-list?customer_id=' + that.data.customer_id;
          that.getShoppingCartList(shoppingCartListUrl);
        }
      },
      fail(error) {
        console.log(error)
      }
    })
  },
  // 单选
  checkedClick(e){
    console.log(e)
    var cart_id = e.currentTarget.dataset.cart_id;
    var product_id = e.currentTarget.dataset.product_id;
    var checked=e.currentTarget.dataset.checked;
    var cart_ids='';
    var product_ids='';
    if (checked==2){
      cart_ids = this.data.cart_ids +','+ cart_id;
      product_ids = this.data.product_ids + ',' + product_id;
    }
    this.setData({
      cart_ids: cart_ids,
      product_ids: product_ids
    })
  },
  // 全选
  totalSelect(e){
    var that=this;
    var cart_ids = that.data.cart_ids;
    var product_ids = that.data.product_ids;
    var shoppingCartListInfo = that.data.shoppingCartListInfo;
    for (var i = 0; i < shoppingCartListInfo.length; i++) {
      cart_ids = cart_ids+','+ shoppingCartListInfo[i].cart_id;
      product_ids = product_ids + ',' + shoppingCartListInfo[i].product_id;
      shoppingCartListInfo[i].checked=1;
    }
    that.setData({
      cart_ids: cart_ids,
      product_ids: product_ids,
      shoppingCartListInfo: shoppingCartListInfo,
      totalDelete:true
    })
  },
  // 删除购物车内容
  deleteShoppingCart(e){
    var that=this;
    var cart_ids = this.data.cart_ids.substring(1);
    var deleteShoppingCartUrl = baseUrl + '/api/shopping/cart/delete?cart_ids=' + cart_ids;
    var shoppingCartListInfo = that.data.shoppingCartListInfo;
    var cart_idsArr = cart_ids.split(',');
    var isShoppingCartNull = that.data.isShoppingCartNull;
    var totalDelete = that.data.totalDelete;
    wx.request({
        url: deleteShoppingCartUrl,
        success(res) {
          // console.log(res)
          if (res.data.success) {
            if (totalDelete){
              that.setData({
                isShoppingCartNull:true,
                shoppingCartListInfo:[]
              })
              console.log(that.data.isShoppingCartNull)
            }else{
              for (var i = 0; i < shoppingCartListInfo.length; i++) {
                for (var j = 0; j < cart_idsArr.length; j++) {
                  if (shoppingCartListInfo[i].cart_id == cart_idsArr[j]) {
                    shoppingCartListInfo.splice(i, 1)
                  }
                }
              }
              that.setData({
                shoppingCartListInfo: shoppingCartListInfo
              })
              if (that.data.shoppingCartListInfo.length==0){
                that.setData({
                  isShoppingCartNull: true,
                })
              }
              console.log(that.data.shoppingCartListInfo)
            }
          }
        },
        fail(error) {
          console.log(error)
        }
      })
  },
  goHomepage(e){
    wx.switchTab({
      url: '../homepage/homepage',
    })
  },
  // 点击去提交订单
  goSubmitOrder(e){
    var product_ids = this.data.product_ids.substring(1);
    wx.setStorage({
      key: 'product_ids',
      data: product_ids,
    })
    wx.navigateTo({
      url: '../submitOrder/submitOrder',
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
    var that = this;
    // 获取购物车列表
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        that.setData({
          customer_id: res.data
        })
        var shoppingCartListUrl = baseUrl + '/api/shopping/cart/load-list?customer_id=' + that.data.customer_id;
        that.getShoppingCartList(shoppingCartListUrl);
        // 获取为你推荐数据
        that.getRecommendGoods(baseUrl + '/api/product/recommend?shop_id=10000&recommend_id=4')
      },
    })
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