
const request=function(path){
  // "http://musicapi.leanapp.cn"
  const base_url ="http://neteasecloudmusicapi.zhaoboy.com"
  const url = base_url +path
  return function(data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url,
        data,
        success:(res)=>{
          resolve(res)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
    }
}
export const getPlayListHot = request("/top/playlist")
export const getPlaylistDetailById = request("/playlist/detail")
export const getPlayerUrlById=request("/song/url")
export const getSongDetailById=request("/song/detail")
export const gethotsongs = request('/search/hot');
export const searchSuggest=request("/search/suggest")
// type 1,2,3,4
export const getBanner=request("/banner")
export const searchBykeywords=request("/search")

