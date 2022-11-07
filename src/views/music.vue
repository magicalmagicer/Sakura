<template>
  <el-container>
    <el-header class="musicHeader">音乐将一切平凡的画面赋予深厚的意义~</el-header>
    <el-container>
      <el-main>
        <Banner></Banner>
        <Search></Search>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import WOW from 'wowjs'
import Banner from '../components/musicBanner.vue'
import Search from '../components/musicSearch.vue'
import FooterBar from '../components/musicPlayer.vue'
export default {
  data() {
    return {
      // count: 0,
      // bookList: [],
      activePath: '/daily',
      menuList: [
        { path: '/daily', title: '每日推荐', Login: true, type: 1 },
        { path: '/search', title: '搜索', Login: true, type: 0 }
      ]
    }
  },
  components: { Banner, Search, FooterBar },
  methods: {
    changePath(path) {
      this.activePath = path
    }
  },
  created() {
    // this.getBook()
  },
  mounted() {
    let wow = new WOW.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    })
    wow.init()
  }
}
</script>

<style lang="less" scoped>
.el-main {
  background: url('../assets/musicbg.webp') no-repeat;
  background-size: cover;
}
.musicHeader {
  margin: 20px 0;
  font-family: 'cute';
  font-size: 28px;
  color: rgb(255, 255, 0);
  // color: rgb(231, 27, 100);
}
.el-header {
  // background-color: #b3c0d1;
  // color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}

body > .el-container {
  // margin-top: 40px;
  margin-bottom: 40px;
}
</style>
