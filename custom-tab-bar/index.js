Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#d63433",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/music.png",
      selectedIconPath: "/image/selected-music.png",
      text: "歌单"
    }, {
      pagePath: "/pages/index2/index2",
      iconPath: "/image/me.png",
      selectedIconPath: "/image/selected-me.png",
      text: "我"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url,data.index)
      wx.switchTab({ url })
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})