// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

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
    CurrenTime: 0,
    // 留言列表
    leaveMessage: [],
    // 消息状态改变
    messageStatusChange: false,
    // 回复列表
    reply: [],
    // 点赞列表
    likeMessage: [],
    // 编辑器全屏
    fullScreen: false
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
    },
    // 留言
    setLeaveMessage(state, val) {
      state.leaveMessage = val
    },
    // 回复
    setReply(state, val) {
      state.reply = val
    },
    setMessageStatusChange(state, val) {
      state.messageStatusChange = val
    },
    setLikeMessage(state, val) {
      state.likeMessage = val
    },
    setFullScreen(state, val) {
      state.fullScreen = val
    }
  },
  getters: {
    getMusicInfo: state => state.musicInfo
  },
  actions: {},
  modules: {}
})
