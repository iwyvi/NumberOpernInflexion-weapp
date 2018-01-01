Page({
  data: {
    result: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let result = wx.getStorageSync("lastOpern") || "";
    this.setData({
      result
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
  copy(e) {
    wx.setClipboardData({
      data: this.data.result,
      success: function (res) {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success',
          duration: 2000
        })
      },
    })
  }
})