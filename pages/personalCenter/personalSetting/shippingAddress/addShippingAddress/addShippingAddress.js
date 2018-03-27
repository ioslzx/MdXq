// pages/personalCenter/personalSetting/shippingAddress/addShippingAddress/addShippingAddress.js

var model = require('../citySelectModel/citySelectModel.js')
var show = false;
var item = {};

var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      show: show
    },
    isScroll:true,
    receipt_name:'',
    telephone:'',
    fullAddress:'',
    city_area:'',
    isDefault:2,
    province:'',
    county:'',
    city:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 获取三级城市列表
  locationAddress(e){
    // console.log('选择城市')
    model.animationEvents(this, 0, true, 400);
    this.setData({
      isScroll:false
    })
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
    this.setData({
      isSelectCity: false
    })
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name,
      isScroll:true,
      // city_area: item.provinces[item.value[0]].name + item.provinces[item.value[1]].name + item.provinces[item.value[2]].name
    });

    var city_area = this.data.province + this.data.city + this.data.county;
    this.setData({
      city_area: city_area
    })
    console.log(this.data.city_area)
    // debugger
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  // 保存地址
  saveAddress(e){
    var that = this
    console.log(that.data.isDefault)
    debugger
    console.log(that.data.city_area)
    var url = baseUrl + '/api/address/edit?receipt_name=' + that.data.receipt_name + '&telephone=' + that.data.telephone + '&detailed_address=' + that.data.fullAddress + '&city_area=' + that.data.city_area + '&customer_id=10030' + '&is_default=' + that.data.isDefault
    wx.request({
      url: url,
      success(res){
        console.log(res)
      }
    })
  },
  // 获取收货人输入内容
  getReceipt_name(e){
    this.setData({
      receipt_name: e.detail.value
    })
  },
  getTelephone(e){
    this.setData({
      telephone: e.detail.value
    })
  },
  getFullAddress(e){
    // debugger
    console.log(e)
    this.setData({
      fullAddress: e.detail.value
    })
  },
  getLocationAddress(e){
  //  debugger
    console.log(e)
    this.setData({
      city_area: e.detail.value
    })
  },
  getMorenAddress(e){
    // debugger
    console.log(e)
    this.setData({
      city_area: e.detail.value
    })
  },
  // 是否为默认地址
  switchChange(e){
    console.log(e) //e.detail.value
    if (e.detail.value){
      this.setData({
        isDefault:1
      })
    }else{
      this.setData({
        isDefault: 2
      })
    }
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