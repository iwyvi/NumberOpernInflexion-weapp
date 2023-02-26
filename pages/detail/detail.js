const app = getApp();
const time = require("../../utils/time.js");
Page({
  data: {
    opernId: 0,
    opernTitle: '',
    opernText: '',
    updateTime: '无',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.opernId) {
      this.loadOpernDetail(options.opernId);
      this.checkFirstOpen();
    } else if (options && options.saveFromResult) {
      let result = wx.getStorageSync("lastOpern") || "";
      this.setData({
        opernText: result
      })
    } else if (options && options.saveFromShare) {
        wx.showModal({
            title: '提示',
            content: '由于安全原因，本小程序已不再支持曲谱分享功能'
        });
    //   this.setData({
    //     opernTitle: decodeURIComponent(options.title) || '',
    //     opernText: decodeURIComponent(options.text) || ''
    //   })
    }
  },

  getCurrentTime(value) {
    return time.getCurrentTime(value);
  },

  formSubmit(e) {
    let opernTitle = e.detail.value.opernTitle;
    let opernText = e.detail.value.opernText;
    if (!opernTitle) {
      wx.showToast({
        title: '请输入曲谱标题',
        image: '/assets/img/prompt_fill.png',
        duration: 2000
      })
      return;
    }

    if (this.data.opernId) {
      app.updateOpern(this.data.opernId, {
        opernTitle,
        opernText
      })
    } else {
      let tempId = app.newOpern({
        opernTitle,
        opernText
      })
      this.setData({
        opernId: tempId
      });
    }
    this.loadOpernDetail(this.data.opernId);
    wx.showToast({
      title: '保存成功',
      duration: 1000
    })
  },
  loadOpernDetail(opernId) {
    const opernDetail = app.getOpernDetail(opernId);
    if (opernDetail) {
      this.setData({
        opernId,
        opernTitle: opernDetail.data.opernTitle,
        opernText: opernDetail.data.opernText,
        updateTime: time.getCurrentTime(opernDetail.data.updateTime),
      })
    }
  },
  checkFirstOpen() {
    wx.showModal({
    title: '提示',
    content: '本小程序没有提供网络服务，曲谱内容仅存在本地。由于安全原因，后续更新会移除曲谱存储功能，请及时备份。'
    })
  },
//   onShareAppMessage(options) {
//     return {
//       title: '曲谱分享',
//       path: `pages/detail/detail?saveFromShare=true&title=${encodeURIComponent(this.data.opernTitle)}&text=${encodeURIComponent(this.data.opernText)}`
//     }
//   },
})