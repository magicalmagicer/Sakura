<template>
  <!--音乐播放器封装 -->
  <div class="player">
    <el-button type="success" @click="playerVisible = !playerVisible" v-show="!playerVisible" size="mini" plain>显示</el-button>
    <div class="player-container" v-show="playerVisible">
      <!-- 歌曲信息 -->
      <div class="player-left">
        <el-image class="pointer img-border" :src="musicInfo.imgUrl ? musicInfo.imgUrl : 'https://cdn.jsdelivr.net/gh/crazybox521/blogImg/music.jpg'" lazy />
        <div class="music-info">
          <div class="font-14 w-150 text-hidden">{{ musicInfo.name ? musicInfo.name : '未知歌曲' }}</div>
          <div class="font-12 w-100 text-hidden">{{ musicInfo.singer ? musicInfo.singer : '未知歌手' }}</div>
        </div>
      </div>
      <!-- 播放器 -->
      <div class="player-wrapper">
        <!-- 播放器按钮 -->
        <div class="player-bar">
          <!-- <button class="player-bar-btn" @click="changePlayModel">
            <i class="iconfont icon-liebiaoshunxu"></i>
          </button> -->
          <!-- 上一首 -->
          <button class="player-bar-btn" @click="testing">
            <i class="el-icon-caret-left"></i>
          </button>
          <!-- 播放按钮 -->
          <button class="player-bar-btn" @click="pause">
            <i v-show="isPlay" class="el-icon-video-pause"></i>
            <i v-show="!isPlay" class="el-icon-video-play"></i>
          </button>
          <!-- 下一首 -->
          <button class="player-bar-btn" @click="testing">
            <i class="el-icon-caret-right"></i>
          </button>
          <!-- <button class="player-bar-btn" @click="likeMusic">
            <i v-show="!isLiked" class="iconfont icon-aixin"></i>
            <i v-show="isLiked" style="color: #ec4141" class="iconfont icon-aixin1"></i>
          </button> -->
        </div>
        <!-- 进度条 -->
        <div class="time-progress">
          <span class="font-12">{{ CurrenTime | format }}</span>
          <el-slider v-model="curren" class="timeSlider" :show-tooltip="false" @change="changeCurrenTime" :disabled="musicUrl == ''"></el-slider>
          <span class="font-12">{{ musicInfo.duration }}</span>
        </div>
        <!-- 音乐播放器 -->
        <audio ref="audioRef" :src="musicUrl" autoplay loop="loop" @click="pause" @ended="changePlayState" @timeupdate="updateCurrenTime"></audio>
      </div>
      <!-- 隐藏按钮 -->
      <div class="btn-other">
        <div class="visible">
          <i class="el-icon-circle-close volume-icon mright-20 pointer" @click="changePlayerVisible" title="隐藏播放器"></i>
        </div>
        <!-- <div class="volume">
          <div @click="isMute = !isMute">
            <i v-if="volume == 0" class="iconfont icon-shengyinguanbi volume-icon pointer"></i>
            <i v-else class="iconfont icon-shengyin volume-icon pointer"></i>
          </div>

          <div class="volume-slider">
            <el-slider v-model="volume" vertical height="200px"> </el-slider>
          </div>
        </div> -->
        <!-- 当前播放列表 -->
        <!-- <div class="curren-list" v-show="playType !== 'personalFm'">
          <i @click="showList" class="iconfont icon-liebiaoshunxu volume-icon pointer"></i>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // props: ['songId'],
  data() {
    return {
      playerVisible: false,
      musicId: 0,
      musicUrl: '',
      // isPlay: false,
      volume: 0,
      // 进度条百分比
      curren: 0,
      musicInfo: {
        imgUrl: '',
        singer: '',
        name: '',
        duration: '0:00',
        totaltime: 0
      }
    }
  },
  filters: {
    format(time) {
      var minutes = parseInt((time % (60 * 60)) / 60)
      var seconds = parseInt((time % 60).toFixed(0))
      seconds = seconds < 10 ? '0' + seconds : seconds
      return minutes + ':' + seconds
    }
  },
  computed: {
    ...mapState(['CurrenTime']),
    isPlay() {
      return this.$store.state.PlayState
    },
    listenSongIdChange() {
      return this.$store.state.musicId
    }
  },
  watch: {
    /* 通过Vuex管理的播放状态,audio会自动播放 */
    isPlay(val) {
      /* 由于misicUrl第一次是状态改变后获取，所以第一次改变不要进入监听 */
      if (this.musicUrl === '') return
      if (val) {
        this.$refs.audioRef.play()
      } else {
        this.$refs.audioRef.pause()
      }
    },
    '$store.state.musicInfo': {
      deep: true,
      handler(newVal, oldVal) {
        this.musicInfo = newVal
      }
    },
    listenSongIdChange(newVal, oldVal) {
      // 歌曲切换
      this.musicId = newVal
      this.getSong()
    }
  },
  created() {
    this.getSong()
  },
  methods: {
    changePlayerVisible() {
      this.playerVisible = false
    },
    testing() {
      return this.$message.info('这个功能还没开发哦~')
    },
    // 更改歌曲进度
    changeCurrenTime(val) {
      let time = ((val / 100) * parseInt(this.musicInfo.totaltime)) / 1000
      this.$refs.audioRef.currentTime = time
    },
    // 歌曲自动播放完毕
    changePlayState() {
      this.getSong()
    },
    // 获取歌曲
    async getSong() {
      // this.songId = this.musicId
      if (this.musicId) {
        const { data: res } = await this.$http.get(this.$originUrl2 + `/song/url?id=${this.musicId}`)
        if (res.data[0].url === null) return this.$message.warning('播放歌曲失败！')
        this.musicUrl = res.data[0].url
      } else {
        return
      }
    },
    /* 更新当前播放时间 */
    updateCurrenTime() {
      if (!this.$refs.audioRef) return
      // console.log(1)
      /* 通过audio对象的方法获取当前时间 */
      let time = this.$refs.audioRef.currentTime
      time = Math.floor(time)
      /* 同步进度条 */
      if (time !== this.CurrenTime) {
        this.$store.commit('setCurrenTime', time)
        let percent = ((this.CurrenTime * 1000) / this.musicInfo.totaltime) * 100
        percent = Math.floor(percent)
        this.curren = percent
      }
    },
    /* 暂停 */
    pause() {
      if (!this.musicUrl) return this.$message.info('未选择播放歌曲！')
      this.$store.commit('setPlayState', !this.isPlay)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/less/lessConfig.less';

/* 整体 */
.player {
  height: 80px;
  // width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  // bottom: 0;
}
.pointer {
  cursor: pointer;
}
.visible {
  // width: 50px;

  padding-left: 100px;
}
.player-container {
  box-sizing: border-box;
  border-top: 1px solid #eeeeee;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
}
/* 播放器左边的信息区 */
.player-left {
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
  .img-border {
    margin: 0 10px;
    height: 50px;
    width: 50px;
    border-radius: 8px;
  }
  &-info {
    margin: 10px;
    line-height: 20px;
    .info-title {
      div {
        display: inline-block;
      }
    }
  }
}
/* 中间的按钮区 */
.player-bar {
  width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 6px;
  justify-content: space-around;
  &-btn {
    outline: none;
    border: none;
    background-color: #fff;
    cursor: pointer;
    .iconfont {
      font-size: 18px;
    }
    i {
      // display: inline-block;
      font-size: 24px;
    }
    &:nth-child(2) {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      // background-color: #f4f4f4;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      color: red;
    }
    // &:nth-child(2):hover {
    //   background-color: #e5e5e5;
    // }
  }
  &-btn_disabled {
    cursor: not-allowed;
    color: #e5e5e5;
    &:hover {
      color: #e5e5e5;
    }
  }
}
.font-12 {
  font-size: 12px;
  padding-top: 5px;
}
/* 时间进度条 */
.time-progress {
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.timeSlider {
  width: 460px;
  margin: 0 10px;
}
/* 右侧按钮 */
.btn-other {
  display: flex;
  width: 300px;
  justify-content: center;
}
/* 音量图标 */
.volume-icon {
  font-size: 30px;
}
.volume {
  position: relative;
  margin-right: 20px;
  .volume-slider {
    display: none;
    position: absolute;
    top: -220px;
    left: -3px;
    background-color: #ffffff;
    padding: 10px 0;
    border-radius: 5px;
    box-shadow: 0 0 10px #bbbbbb;
  }
  &:hover .volume-slider {
    display: block;
  }
}
</style>
