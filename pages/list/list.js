const app = getApp();
const time = require("../../utils/time.js");
Page({
  data: {
    opernList: []
  },
  onShow() {
    this.loadOpernList();
  },
  loadOpernList() {
    let tempOpernList = app.loadOpernList();
    tempOpernList.forEach(element => {
      element.updateTime = time.getCurrentTime(element.updateTime);
    });
    this.setData({
      opernList: tempOpernList
    })
  },
  newOpern(e) {
    wx.navigateTo({
      url: "/pages/detail/detail"
    })
  },
  openOpern(e) {
    wx.navigateTo({
      url: "/pages/detail/detail?opernId=" + e.currentTarget.dataset.id
    })
  },
  deleteOpern(e) {
    wx.showModal({
      title: '提示',
      content: '删除xxx',
      success: (res) => {
        if (res.confirm) {
          let opernId = e.currentTarget.dataset.id;
          app.deleteOpern(opernId);
          this.loadOpernList();
        }
      }
    })
  }
})