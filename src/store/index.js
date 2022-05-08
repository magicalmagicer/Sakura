import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    tagCount: 0,
    //  isSignIn 登录状态，0为未登录
    isSignIn: 0,
    token: '',
    username: '',
    id: 1,
    musicId: 0,
    PlayState: false,
    musicInfo: {},
    // 当前歌曲播放进度
    CurrenTime: 0
  },
  mutations: {
    changIsSignIn(state, n) {
      state.isSignIn = n
    },
    setToken(state, val) {
      state.token = val
    },
    setCount(state, val) {
      state.count = val
    },
    setTagCount(state, val) {
      state.tagCount = val
    },
    setUsername(state, val) {
      state.username = val
    },
    setId(state, val) {
      state.id = val
    },
    setMusicId(state, val) {
      state.musicId = val
    },
    setPlayState(state, val) {
      state.PlayState = val
    },
    setMusicInfo(state, info) {
      state.musicInfo = Object.assign({}, state.musicInfo, info)
    },
    setCurrenTime(state, val) {
      state.CurrenTime = val
    }
  },
  getters: {
    getMusicInfo: state => state.musicInfo
  },
  actions: {},
  modules: {}
})
