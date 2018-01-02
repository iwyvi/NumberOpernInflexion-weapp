Page({
  data: {
    opernId: '',
    opernTitle: '',
    opernText: '',
    updateTime: '无',
    opernList: [],
    loadStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  searchOpernIndex(opernId) {
    this.loadOpernList();
    let list = this.data.opernList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].opernId == opernId) {
        return i;
      }
    }
    return -1;
  },
  formSubmit(e) {
    let opernTitle = e.detail.value.opernTitle;
    let opernText = e.detail.value.opernText;
    if(!opernTitle) {
      wx.showToast({
        title: '请输入曲谱标题',
        image: '/assets/img/prompt_fill.png',
        duration: 2000
      })
      return;
    }
    let index = this.searchOpernIndex(this.data.opernId);
    if (index != -1) {
      this.data.opernList[index] = Object.assign(this.data.opernList[index], {
        opernTitle,
        opernText,
        updateTime: Date.now(),
      })
    } else {
      let tempId = wx.getStorageSync('opernId') || 0;
      tempId++;
      this.data.opernList.push({
        opernId: tempId,
        opernTitle,
        opernText,
        updateTime: Date.now(),
      })
      wx.setStorageSync('opernId', tempId);
      this.setData({
        opernId: tempId,
      });
    }
    this.data.opernList.sort((a, b) => {
      return a.updateTime < b.updateTime;
    })
    wx.setStorageSync('opernList', JSON.stringify(this.data.opernList));
    this.setData({
      updateTime: Date.now(),
    });
    this.loadOpernList(true);
  },
  loadOpernList(force = false) {
    if (!this.loadStatus || force) {
      try {
        let list = wx.getStorageSync('opernList');
        if (list) {
          list = JSON.parse(list);
        } else {
          list = [];
        }
        this.setData({
          opernList: list,
          loadStatus: true
        });
      } catch (e) {
        wx.showToast({
          title: '加载本地曲谱列表失败',
          image: '/assets/img/prompt_fill.png',
          duration: 2000
        })
      }
    }
  }
})