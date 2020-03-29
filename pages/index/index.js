// pages/index/index.js
import { getPlayListHot } from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getPlayListHot({ order: "hot" }).then(res => {
      if (res.data.code === 200) {
        this.setData({
          playlist: res.data.playlists.map(item=>{
            item.playCount=item.playCount>10000? Math.round(item.playCount/1000)/10+"万":item.playCount
            return item
          }),
        },()=>{console.log(this.data.playlist)})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(999)
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})