<template>
  <div class="hot">
    <!-- 搜索框 -->
    <el-input style="width: 200px" placeholder="找找看吧" v-model.trim()="keywords" ref="inputRef" clearable @focus="getHotSearch" @blur="showInfoTip = false" prefix-icon="el-icon-search" @keyup.enter.native="searchMusic"></el-input>
    <el-button type="primary" @click="searchMusic">搜索</el-button>
    <!-- 热搜榜 -->
    <transition name="el-fade-in">
      <div class="search-info_tip" v-show="showInfoTip">
        <div v-show="keywords === ''">
          <el-card class="hot-search">
            <div class="hot-title font-14">
              <span>热搜榜</span>
            </div>
            <div class="hot-item pointer" :class="{ 'top-item': index < 3 }" v-for="(item, index) in hotList" :key="index" @click="clickHot(item.searchWord)">
              <div class="item-index">{{ index + 1 }}</div>
              <div class="item-info">
                <div class="key-word">
                  <span class="font-12 item-key">{{ item.searchWord }}</span>
                </div>
              </div>
            </div>
          </el-card>
          <!-- <div class="hot-search">
            <div class="hot-title font-14">热搜榜</div>
            <div class="hot-item pointer" :class="{ 'top-item': index < 3 }" v-for="(item, index) in hotList" :key="index" @click="clickHot(item.searchWord)">
              <div class="item-index">{{ index + 1 }}</div>
              <div class="item-info">
                <div class="key-word">
                  <span class="font-12 item-key">{{ item.searchWord }}</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </transition>
    <!-- 歌曲列表 -->
    <el-table :data="songList" style="width: 100%;padding:10px 20px;margin-top:30px" @row-dblclick="playMusic" stripe highlight-current-row>
      <!-- <el-table-column prop="date" label="日期" width="180"> </el-table-column> -->
      <el-table-column type="index" label="#" header-align="center" width="100pxpx" align="center"> </el-table-column>
      <el-table-column prop="name" label="歌名" header-align="center" width="215px"> </el-table-column>
      <el-table-column prop="singer" label="歌手" header-align="center" align="center" width="215px"> </el-table-column>
      <el-table-column prop="album" label="专辑" header-align="center" align="center" width="215px" class="over"> </el-table-column>
      <el-table-column prop="duration" label="时长" header-align="center" align="center" width="px"> </el-table-column>
      <!-- <el-table-column label="操作" header-align="left"> <i class="el-icon-video-play pointer" @click="playSong(item.id)"></i></el-table-column> -->
      <!-- <el-table-column prop="address" label="地址"> </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
// import vuex from 'vuex'
export default {
  data() {
    return {
      defaultWord: '',
      keywords: '',
      showInfoTip: false,
      songList: [],
      // 播放列表
      musicList: [],
      // 当前播放歌曲id、
      songId: 0,
      hotList: [] //热搜列表
    }
  },
  created() {
    this.getDefault()
  },
  filters: {
    format(time) {
      var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = parseInt((time % (1000 * 60)) / 1000).toFixed(0)
      seconds = seconds < 10 ? '0' + seconds : seconds
      return minutes + ':' + seconds
    }
  },
  methods: {
    //  播放音乐
    playMusic(row) {
      // console.log(row)
      this.$store.commit('setMusicId', row.id)
      this.$store.commit('setPlayState', true)
      // console.log(typeof row.duration)
      let data = {
        name: row.name,
        singer: row.singer,
        totaltime: row.totaltime,
        duration: row.duration,
        imgUrl: row.artists[0].img1v1Url
      }
      // console.log(data)
      this.$store.commit('setMusicInfo', data)
      // console.log(this.$store.state.musicInfo)
    },
    // 获取当日热搜词汇对应歌曲
    async getSongList() {
      const { data: res } = await this.$http.get(this.$originUrl2 + `/search?keywords=${this.defaultWord}&limit=20`)
      if (res.code == 200) {
        this.songList = res.result.songs
      }
      this.songList.forEach(item => {
        item.singer = item.artists[0].name
        item.album = item.album.name
        item.totaltime = item.duration
        item.duration = this.$options.filters['format'](item.duration)
      })
    },
    // 获取默认热词
    async getDefault() {
      const { data: res } = await this.$http.get(this.$originUrl2 + '/search/default')
      // console.log(res)
      if (res.code == 200) {
        // console.log(res)
        this.defaultWord = res.data.realkeyword
        this.getSongList()
        // console.log(this.defaultWord)
      }
    },
    /* 点击热搜 */
    clickHot(word) {
      // console.log(1)
      // console.log(word)
      if (word !== '') {
        this.keywords = word
        this.searchMusic()
      }
    },
    /* 无输入时获取热搜及搜索记录，有输入时获取建议 */
    async getHotSearch() {
      this.showInfoTip = true
      if (this.hotList.length !== 0) return
      const { data: res } = await this.$http.get(this.$originUrl2 + '/search/hot/detail')
      // console.log(res)
      if (res.code !== 200) return
      this.hotList = res.data.slice(0, 6)
    },
    // 搜索歌曲
    async searchMusic() {
      // console.log('搜索歌曲')
      if (this.keywords === '') {
        return this.$message.waring('请输入搜索关键词！')
      }
      this.showInfoTip = false
      const { data: res } = await this.$http.get(this.$originUrl2 + `/search?keywords=${this.keywords}&limit=20`)
      // console.log('拿到歌曲列表了')
      if (res.code == 200) {
        this.songList = res.result.songs
        this.songList.forEach(item => {
          // if (item.url) {
          item.singer = item.artists[0].name
          item.album = item.album.name
          item.totaltime = item.duration
          item.duration = this.$options.filters['format'](item.duration)
          // }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-table {
  background: transparent;
  background-color: transparent;
  .cell {
    white-space: nowrap;
  }
}

.pointer {
  cursor: pointer;
}
/* 搜索框容器 */
.hot {
  margin-left: 10px;
  position: relative;
  /* 搜索建议等的弹出层 */
  .search-info_tip {
    position: absolute;
    top: 40px;
    left: 0;
    width: 340px;
    min-height: 340px;
    max-height: 420px;
    transition: all 0.5s;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 1px 4px #dddddd;
    background-color: #fff;
    z-index: 100;
    color: #000;
  }
}
/* 热搜区域 */
.hot-search {
  margin-top: 0px;
  .hot-item {
    height: 50px;
    // width: 200px;
    display: flex;
    align-items: center;
    // justify-content: center;
    &:hover {
      background-color: #f2f2f2;
    }
    .item-index {
      color: #c2c2c2;
      width: 40px;
      text-align: center;
    }
  }
  .top-item {
    .item-index {
      color: #e13e3e;
    }
    .item-key {
      font-weight: bold;
    }
  }
}
/* 标题 */
.hot-title {
  color: #666666;
  margin: 10px auto 10px 10px;
}
</style>
