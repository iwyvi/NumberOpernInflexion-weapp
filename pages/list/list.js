Page({
  data: {
    opernList: []
  },
  onShow() {
    this.loadOpernList();
  },
  onLoad() {

  },
  searchOpernIndex(opernId) {
    let list = this.data.opernList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].opernId == opernId) {
        return i;
      }
    }
    return -1;
  },
  loadOpernList() {
    try {
      let list = wx.getStorageSync('opernList');
      if(list){
        list = JSON.parse(list);
      }else{
        list = [];
      }
      this.setData({
        opernList: list
      })
    } catch (e) {
      wx.showToast({
        title: '加载本地曲谱列表失败',
        image: '/assets/img/prompt_fill.png',
        duration: 2000
      })
    }
  },
  newOpern(e) {
    wx.navigateTo({
      url: "/pages/detail/detail"
    })
  },
  openOpern(e) {
    wx.navigateTo({
      url: "/pages/detail/detail"
    })
  },
  deleteOpern(e) {
    wx.showModal({
      title: '提示',
      content: '删除xxx',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})