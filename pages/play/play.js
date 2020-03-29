// pages/play/play.js
import { getPlayerUrlById, getSongDetailById} from "../../utils/api.js";
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    song:[],
    innerAudioContext:{},
    show:true,
    showLyric:true,
    songId:0,
    historySongId:[],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({index:options.index})
    this.play(options.playId)
  },
  play(id){
    app.globalData.songId=id;
    const innerAudioContext= wx.createInnerAudioContext();
    this.setData({
      innerAudioContext,
      isPlay:true
    });
    getPlayerUrlById({ id:id }).then(res => {
      if (res.data.code === 200) {
        console.log(res.data.data[0])
        this.createAudio(res.data.data[0])
      }
    });
    getSongDetailById({ ids: id }).then(res => {
      console.log(res.data.songs[0])
      this.setData({
        song: res.data.songs[0]
      })
      app.globalData.songName = res.data.songs[0].name
    })
  },
  createAudio(res){
    const bgAudio=wx.getBackgroundAudioManager();
    app.globalData.bgAudioManage=bgAudio;
    bgAudio.title="title"
    bgAudio.src=res.url;
    const historySongId=this.data.historySongId;
    const historySong={
      id:app.globalData.songId,
      songname:app.globalData.songName
    }
    historySongId.push(historySong)

    bgAudio.onPlay(res=>{
      this.setData({
        isPlay:true,
        historySongId
      })
    });
    bgAudio.onEnded(()=>{
      // 播放下一首
    })
    wx.setStorageSync("historyId", historySongId)
  },
// 播放与暂停
toggleBGAudio(){
  const bgAudioManage = app.globalData.bgAudioManage;
  console.log(bgAudioManage)
  if(this.data.isPlay){
    bgAudioManage.pause();

  }else{
    bgAudioManage.play()
  }
  this.setData({
    isPlay:!this.data.isPlay
  })
},
showLyric(){
  this.setData({
    showLyric:!this.data.showLyric
  })
},
  goLastSong(event){
    let isNext=event.target.dataset.next==="true"
    const lastSongId=app.globalData.waitForPlaying;
    let index=0
    let songId=null
    console.log(isNext)
    if(isNext){
      this.data.index = this.data.index < lastSongId.length - 1?this.data.index+1:0;
      songId = lastSongId[this.data.index].id
    }else{
      this.data.index = this.data.index > 0 ? this.data.index - 1 : lastSongId.length-1;
      songId = lastSongId[this.data.index].id
    }
    this.data.songId=songId;
    this.play(songId);
    app.globalData.songId=songId;

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