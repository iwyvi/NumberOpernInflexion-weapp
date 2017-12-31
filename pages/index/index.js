//index.js
const inflexion = require("../../utils/inflexion.js");

Page({
  data: {
    toneMap: ["1 = C", "1 = #C", "1 = D", "1 = #D", "1 = E", "1 = F", "1 = #F", "1 = G", "1 = #G", "1 = A", "1 = #A", "1 = B"],
    beforeMode: 0,
    afterMode: 0,
    beforeText: "",
    afterText: ""

  },
  bindBeforeTextInput(e) {
    this.setData({
      beforeText: e.detail.value
    })
  },
  bindBeforeModePickerChange(e) {
    this.setData({
      beforeMode: e.detail.value
    })
  },
  bindAfterModePickerChange(e) {
    this.setData({
      afterMode: e.detail.value
    })
  },
  bindAfterTextLongpress(e) {
    wx.setClipboardData({
      data: this.data.afterText,
      success: function (res) {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
  convert(e) {
    let transmode = this.data.beforeMode - this.data.afterMode;
    let finalText = inflexion.change(this.data.beforeText, transmode);
    this.setData({
      afterText: finalText
    })
  },
  onLoad() {

  }
})
