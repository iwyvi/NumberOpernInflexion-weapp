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
    }else if(options && options.saveFromResult) {
      let result = wx.getStorageSync("lastOpern") || "";
      this.setData({
        opernText: result
      })
    }
    this.checkFirstOpen();
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
    let isFirstOpen = true;
    let opernId = wx.getStorageSync('opernId');
    if(opernId) {
      isFirstOpen = false;
    }
    if(isFirstOpen) {
      wx.showModal({
        title: '提示',
        content: '本小程序没有提供网络服务，曲谱内容仅存在本地，请及时备份'
      })

    }
  }
})