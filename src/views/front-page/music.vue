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
import Banner from '@/components/music/musicBanner.vue'
import Search from '@/components/music/musicSearch.vue'
// import FooterBar from './'

export default {
  data() {
    return {
      activePath: '/daily',
      menuList: [
        { path: '/daily', title: '每日推荐', Login: true, type: 1 },
        { path: '/search', title: '搜索', Login: true, type: 0 }
      ]
    }
  },
  components: { Banner, Search },
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
  background: url('../../assets/musicbg.webp') no-repeat;
  background-size: cover;
}
.musicHeader {
  margin: 20px 0;
  font-family: 'cute';
  font-size: 28px;
  color: rgb(255, 255, 0);
}
.el-header {
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
