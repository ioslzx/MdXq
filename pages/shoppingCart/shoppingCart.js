// pages/shoppingCart/shoppingCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyNum: 1,
    minusStatus: 'disabled',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 点击减号按钮函数
  bindMinus:function(e){
    var buyNum = this.data.buyNum;
    if(buyNum>1){
      buyNum--;
    }
    var minusStatus = buyNum <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      buyNum: buyNum,
      minusStatus: minusStatus
    });
  },
  // 点击增加按钮函数
  bindPlus: function (e) {
    var buyNum = this.data.buyNum;
    buyNum++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = buyNum <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      buyNum: buyNum,
      minusStatus: minusStatus
    });
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