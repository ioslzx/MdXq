var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
var ProductInfoArr = [];
var product_infoArr=[];
var data=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAddress:'',
    addressDetailInfo:'',
    customer_id:'',
    product_idArr:[],
    ProductInfoArr:[],//展示
    product_infoArr:[],//传参
    level:'',
    shop_id:'',
    model_idArr:[],
    cart_idArr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 选择地址
  goAddress(e){
    wx.navigateTo({
      url: '../personalCenter/personalSetting/shippingAddress/shippingAddress',
    })
  },
  // 获取地址详情数据
  getAddressDetail(url) {
    var that = this
    wx.request({
      url: url,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          that.setData({
            addressDetailInfo: res.data.result
          })
        }
      }
    })
  },
  // 获取购物车列表
  getShoppingCartList(url) {
    var that = this;
    wx.getStorage({
      key: 'level',
      success: function(res) {
        // console.log(res.data)
        that.setData({
          level:res.data
        })
        wx.request({
          url: url,
          success(res) {
            console.log(res)
            if (res.data.success) {
              // debugger
              var data = res.data.result;
              var product_infoObj = {};
              for (var i = 0; i < data.length; i++) {
                data[i].exhibition = imgUrl + data[i].exhibition;
                product_infoObj = {
                  product_id: data[i].product_id,
                  quantity: data[i].quantity,
                }
                if (that.data.level==1){
                  product_infoObj.price =data[i].market_price
                  data[i].price = data[i].market_price
                } else if (that.data.level ==2){
                  product_infoObj.price = data[i].member_price
                  data[i].price = data[i].member_price
                }else{
                  product_infoObj.price = data[i].vip_price
                  data[i].price = data[i].vip_price
                }
                product_infoArr.push(product_infoObj)
              }
              that.setData({
                ProductInfoArr: data,
                product_infoArr: product_infoArr
              })
            }
          }
        })
      },
    })
  },
  // 点击提交订单
  payClick(e){
    var that=this;
    var product_infos = JSON.stringify(that.data.product_infoArr)
    var payClickUrl = baseUrl +'/api/order/save?shop_id='+10000
      + '&customer_id=' + that.data.customer_id + '&address_id=' + that.data.defaultAddress + '&product_infos=' + product_infos;
    console.log(payClickUrl)
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
    var that=this;
    // 获取默认地址
    wx.getStorage({
      key: 'defaultAddress',
      success: function(res) {
        that.setData({
          defaultAddress:res.data
        })
        // 获取地址详情数据
        var url = baseUrl + '/api/address/load?address_id=' + that.data.defaultAddress
        that.getAddressDetail(url)
      },
    })
    // 获取customer_id
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
        var shoppingCartListUrl = baseUrl + '/api/shopping/cart/load-list?customer_id=' + that.data.customer_id;
        that.getShoppingCartList(shoppingCartListUrl);
      },
    })
    // 获取购物车id
    wx.getStorage({
      key: 'cart_ids',
      success: function(res) {
        var cart_idArr=res.data.split(',');
        var tempArr = [];
        for (var i = 0; i < cart_idArr.length; i++) {
          if (tempArr.indexOf(cart_idArr[i]) == -1) {
            tempArr.push(cart_idArr[i]);
          }
        }
        that.setData({
          cart_idArr: tempArr
        })
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