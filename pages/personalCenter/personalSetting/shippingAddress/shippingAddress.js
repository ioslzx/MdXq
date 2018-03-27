// pages/personalCenter/personalSetting/shippingAddress/shippingAddress.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressListInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 获取地址列表数据
  getAddressList(url){
    var that = this
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var result = res.data.result;
          for (var i = 0; i < result.length;i++){
            if (result[i].detailed_address.length>7){
              result[i].detailed_address=result[i].detailed_address.substr(0,7)+"..."
            }
          }
          that.setData({
            addressListInfo: result
          })
        }
      }
    })
  },
  // 编辑地址页面
  goEditShippingAddress(e){
    console.log(e)
    wx.navigateTo({
      url: './editShippingAddress/editShippingAddress?address_id=' + e.currentTarget.dataset.address_id + '&is_default=' + e.currentTarget.dataset.is_default,
    })
  },
  // 新增地址页面
  goAddShippingAddress(e){
    wx.navigateTo({
      url: './addShippingAddress/addShippingAddress'
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
    var url = baseUrl + '/api/address/load-list?customer_id=10030'
    this.getAddressList(url)
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