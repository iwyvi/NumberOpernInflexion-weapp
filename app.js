//app.js
App({
  onLaunch: function () {
    this.loadOpernList();
  },
  globalData: {
    opernList: [],
    loadStatus: false
  },

  loadOpernList(force = false) {
    if (!this.globalData.loadStatus || force) {
      try {
        let list = wx.getStorageSync('opernList');
        if (list) {
          list = JSON.parse(list);
        } else {
          list = [];
        }
        this.globalData = Object.assign(this.globalData, {
          opernList: list,
          loadStatus: true
        })
      } catch (e) {
        wx.showToast({
          title: '加载本地曲谱列表失败',
          image: '/assets/img/prompt_fill.png',
          duration: 2000
        })
        return [];
      }
    }
    return JSON.parse(JSON.stringify(this.globalData.opernList));
  },

  saveOpernList() {
    this.loadOpernList();
    this.globalData.opernList.sort((a, b) => {
      return a.updateTime < b.updateTime;
    });
    wx.setStorageSync('opernList', JSON.stringify(this.globalData.opernList));
  },

  getOpernDetail(opernId) {
    this.loadOpernList();
    let list = this.globalData.opernList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].opernId == opernId) {
        return {
          index: i,
          data: list[i]
        };
      }
    }
    return null;
  },

  newOpern(opernData) {
    let tempId = Date.now();
    this.updateOpern(tempId, opernData);
    wx.setStorageSync('opernId', tempId);
    return tempId;
  },

  updateOpern(opernId, opernData) {
    this.loadOpernList();
    let opernDetail = this.getOpernDetail(opernId);
    if (opernDetail) {
      opernDetail.data = Object.assign(opernDetail.data, opernData, {
        updateTime: Date.now()
      });
      this.globalData.opernList[opernDetail.index] = opernDetail.data;
    } else {
      opernData = Object.assign(opernData, {
        opernId,
        updateTime: Date.now()
      });
      this.globalData.opernList.push(opernData);
    }
    this.saveOpernList();
  },

  deleteOpern(opernId) {
    this.loadOpernList();
    let opernDetail = this.getOpernDetail(opernId);
    if (opernDetail) {
      this.globalData.opernList.splice(opernDetail.index, 1);
      this.saveOpernList();
    }

  }
})