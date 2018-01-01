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
  convert(e) {
    let transmode = this.data.beforeMode - this.data.afterMode;
    let rawText = this.data.beforeText;
    console.log(rawText)
    if (!rawText) {
      wx.showToast({
        title: '请输入数字谱',
        icon: 'failure',
        duration: 2000
      })
      return;
    } else {
      let finalText = inflexion.change(rawText, transmode);
      // this.setData({
      //   afterText: finalText
      // })
      wx.setStorageSync("lastOpern", finalText);
      wx.navigateTo({
        url: "/pages/result/result"
      })
    }

  },
  formSubmit(e) {
    this.setData({
      beforeText: e.detail.value.beforeText
    })
    this.convert();
  },
  onLoad() {

  }
})
