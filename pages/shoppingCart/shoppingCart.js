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
    minusStatus: 'disabled',
    isShoppingCartNull:false,
    shoppingCartListInfo:[],
    cart_ids:'',
    // 为你推荐数组
    recommendGoodsInfo: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取购物车列表
    var shoppingCartListUrl = baseUrl +'/api/shopping/cart/load-list?customer_id='+10030;
    this.getShoppingCartList(shoppingCartListUrl);
    // 获取为你推荐数据
    this.getRecommendGoods(baseUrl + '/api/product/recommend?shop_id=10000&recommend_id=4')
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
        console.log(res)
        if (res.data.success) {
          var data = res.data.result;
          for (var i = 0; i < data.length; i++) {
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              recommendGoodsInfo: data
            })
          }
          console.log(that.data.recommendGoodsInfo)
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
            data[i].exhibition = imgUrl + data[i].exhibition
            that.setData({
              quantity: data[i].quantity
            })
          }
          that.setData({
            shoppingCartListInfo:data
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
    // console.log(e)
    var quantity = this.data.quantity;
    var cart_id = e.currentTarget.dataset.cart_id;
    if (quantity>1){
      quantity--;
    }
    var minusStatus = quantity <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity: quantity,
      minusStatus: minusStatus
    });
    console.log(cart_id)
    this.bindManual(cart_id, this.data.quantity);
  },
  // 点击增加按钮函数
  bindPlus: function (e) {
    var quantity = this.data.quantity;
    var cart_id = e.currentTarget.dataset.cart_id;
    quantity++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = quantity <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity: quantity,
      minusStatus: minusStatus
    });
    this.bindManual(cart_id, this.data.quantity)
  },
  // 获取修改数量
  bindManual(cart_id, quantity){
    var quantityUrl = baseUrl +'/api/shopping/cart/edit?cart_id='+
      cart_id + '&quantity=' + quantity;
    console.log(quantityUrl)
    wx.request({
      url: quantityUrl,
      success(res){
        console.log(res)
      },
      fail(error){
        console.log(error)
      }
    })
  },
  checkedClick(e){
    console.log(e)
    var cart_id = e.currentTarget.dataset.cart_id;
    var checked=e.currentTarget.dataset.checked;
    if (checked==2){
      var cart_ids = this.data.cart_ids + cart_id
      this.setData({
        cart_ids: cart_ids
      })
    }else{
      var cart_ids = this.data.cart_ids
      this.setData({
        cart_ids: cart_ids
      })
    }
  },
  // 删除购物车内容
  deleteShoppingCart(e){
    var that=this;
    var cart_ids = this.data.cart_ids;
    var deleteShoppingCartUrl = baseUrl + '/api/shopping/cart/delete?cart_ids=' + cart_ids;
    console.log(deleteShoppingCartUrl)
    wx.request({
      url: deleteShoppingCartUrl,
      success(res){
        console.log(res)
        if(res.data.success){
          // 获取购物车列表
          var shoppingCartListUrl = baseUrl + '/api/shopping/cart/load-list?customer_id=' + 10030;
          that.getShoppingCartList(shoppingCartListUrl);
        }else{

        }
      },
      fail(error){
        console.log(error)
      }
    })
  },
  goHomepage(e){
    wx.switchTab({
      url: '../homepage/homepage',
    })
  },
  goSubmitOrder(e){
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