// components/HotPlaylist/index.js

import { getPlayListHot } from "../../utils/api.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type:Array,
      value:[1,2,3]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },
  pageLifetimes: {
    onShow(){
      getPlayListHot({ order: "hot" }).then(res => {
        if (res.data.code === 200) {
          console.log(999)
          this.setData({
            playlist: res.data.playlists
          })
        }
      })
    },
  },
 

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
