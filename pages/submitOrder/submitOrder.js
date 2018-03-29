var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
var ProductInfoArr = [];
var product_infoArr=[];
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
    model_idArr:[]
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
  // 获取商品信息
  getProductInfo(url){
    var that=this;
    wx.getStorage({
      key: 'level',
      success: function(res) {
        that.setData({
          level:res.data
        })
        wx.request({
          url: url,
          success(res) {
            console.log(res)
            if (res.data.success) {
              var data = res.data.result;
              var ProductInfoObj = {};
              var product_infoObj={};
              wx.getStorage({
                key: 'model_idArr',
                success: function (res) {
                  that.setData({
                    model_idArr: res.data
                  })
                  console.log(that.data.model_idArr)
                  for (var j = 0; j < that.data.model_idArr.length; j++) {
                    for (var i = 0; i < data.mallProductModels.length; i++) {
                      if (that.data.model_idArr[j] == data.mallProductModels[i].model_id){
                        product_infoObj = {
                          product_id: data.product_id,
                          quantity: data.mallProductModels[i].quantity,
                        }
                        ProductInfoObj = {
                          exhibition: imgUrl + data.exhibition,
                          product_name: data.product_name,
                          quantity: data.mallProductModels[i].quantity,
                          model_name: data.mallProductModels[i].model_name,
                          content: data.mallProductModels[i].content,
                          unit: data.mallProductModels[i].unit
                        }
                        if (that.data.level == 1) {
                          ProductInfoObj.price = data.mallProductModels[i].market_price;
                          product_infoObj.price = data.mallProductModels[i].market_price;
                        } else if (that.data.level == 2) {
                          ProductInfoObj.price = data.mallProductModels[i].member_price;
                          product_infoObj.price = data.mallProductModels[i].member_price;
                        } else {
                          ProductInfoObj.price = data.mallProductModels[i].vip_price;
                          product_infoObj.price = data.mallProductModels[i].vip_price;
                        }
                        ProductInfoArr.push(ProductInfoObj);
                        product_infoArr.push(product_infoObj)
                      }
                    }
                  }
                  that.setData({
                    ProductInfoArr: ProductInfoArr,
                    shop_id: data.shop_id,
                    product_infoArr: product_infoArr
                  })
                  console.log(that.data.ProductInfoArr)
                },
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
    var payClickUrl = baseUrl +'/api/order/save?shop_id='+that
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
      },
    })
    // 获取商品id
    wx.getStorage({
      key: 'product_ids',
      success: function(res) {
        var product_idArr=res.data.split(',');
        var tempArr = [];
        for (var i = 0; i < product_idArr.length; i++) {
          if (tempArr.indexOf(product_idArr[i]) == -1) {
            tempArr.push(product_idArr[i]);
          }
        }
        that.setData({
          product_idArr: tempArr
        })
        console.log(that.data.product_idArr)
        for (var i=0;i<that.data.product_idArr.length;i++){
          var productInfoUrl = baseUrl + '/api/product/load?product_id=' + product_idArr[i];
          that.getProductInfo(productInfoUrl)
        }
        
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