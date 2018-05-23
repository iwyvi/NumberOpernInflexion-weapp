Page({
  data: {
    result: ""
  },

  onLoad(options) {
    if (options && options.text) {
      this.setData({
        result: decodeURIComponent(options.text)
      })
    } else {
      let result = wx.getStorageSync("lastOpern") || "";
      this.setData({
        result
      })
    }
  },

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
  },

  save(e) {
    wx.navigateTo({
      url: "/pages/detail/detail?saveFromResult=true"
    })
  },

  onShareAppMessage(options) {
    return {
      title: '转调结果分享',
      path: 'pages/result/result?text=' + encodeURIComponent(this.data.result)
    }
  },
})