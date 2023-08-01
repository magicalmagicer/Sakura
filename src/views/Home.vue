<template>
  <div class="w">
    <!-- 导航栏 -->
    <el-menu id="header" :default-active="$route.path" class="header-container" mode="horizontal" active-text-color="rgb(219, 165, 183)" router v-show="editorFullScreen">
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/music">听歌</el-menu-item>
      <el-menu-item index="/write">写文章</el-menu-item>
      <el-menu-item index="/about">关于我</el-menu-item>
      <el-menu-item>
        <el-dropdown trigger="hover" szie="mini">
          <span>
            <img :src="userAvatar ? userAvatar : userImg" class="user" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toMyWorld" index="/myworld">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <!-- <el-menu-item index="/article" v-if="username == '123'">管理员</el-menu-item> -->
    </el-menu>
    <!-- 音乐播放器 -->
    <!-- <record></record> -->
    <!-- 封面 -->
    <banner v-if="$route.path != '/about'"></banner>
    <el-container>
      <router-view></router-view>
    </el-container>
    <!-- 底部播放器容器 -->
    <div class="footerBar">
      <FooterBar></FooterBar>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import WOW from 'wowjs'
import Footer from '../components/footer.vue'
import banner from '../components/banner.vue'
import Cookie from 'js-cookie'
import FooterBar from '@/components/musicPlayer.vue'
export default {
  components: {
    Footer,
    banner,

    FooterBar
  },
  computed: {
    editorFullScreen() {
      return !this.$store.state.fullScreen
    }
  },
  // watch: {
  //   editorFullScreen(newval, oldval) {
  //     console.log(newval)
  //   }
  // },
  created() {
    this.getUserAvatar()
  },
  data() {
    return {
      userAvatar: '',
      userImg: require('../assets/user.png'),
      activeIndex: '/',
      username: Cookie.get('username'),
      oldScrollTop: 0
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // console.log(to, '组件独享守卫beforeRouteEnter第一个参数')
    if (to.path == '/write') {
      const { data: res } = await this.$http.get(this.$originUrl + '/my/power', { params: { id: Cookie.get('user_id') } })
      // console.log(res.data.power)
      if (res.data.power) {
        next()
      } else {
        this.$message.info('您的无权限进入该页面！')
      }
      // console.log('我是组件')
    } else {
      next()
    }
  },
  methods: {
    exit() {
      // 清除Cookie
      Cookie.remove('token')
      Cookie.remove('username')
      // 清除sessionStorage
      sessionStorage.clear()
      this.$router.push({ path: '/log' })
      // 修改vuex的登录状态
      this.$store.commit('changIsSignIn', 0)
      // // 修改vuex的token
      // this.$store.commit('setToken', '')
      // locapam=tion.reload()
    },
    //获取用户头像
    async getUserAvatar() {
      const { data: res } = await this.$http.get(this.$originUrl + '/my/userinfo', { params: { id: Cookie.get('user_id') } })
      // console.log(res.data)
      this.userAvatar = res.data.avatar
      // console.log(this.userAvatar)
    },
    toMyWorld() {
      this.$router.push(`/myworld/${Cookie.get('user_id')}`)
    },
    handleSelect(key, keyPath) {
      if (key === '/log') {
        this.exit()
      }
    },
    handleScroll() {
      // 获取当前滚动高度
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const headerDom = document.getElementById('header')
      let scrollStep = scrollTop - this.oldScrollTop
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop

      // 向下滚动隐藏导航栏
      if (scrollStep > 0) {
        if (!headerDom.getAttribute('class').includes('not-top')) {
          headerDom.className = 'header-container not-top' // 添加类名 css里设置动画
        }
      } else {
        headerDom.className = 'header-container'
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false)
  },
  mounted() {
    let wow = new WOW.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: false
    })
    wow.init()
    window.addEventListener('scroll', this.handleScroll, false)
  }
}
</script>

<style lang="less" scoped>
#app {
  .footerBar {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    height: 80px;
    width: 100%;
  }
  .user {
    margin-top: -10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .w {
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-container {
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.7s ease;
    border-bottom: solid 0 #e6e6e6;
    // padding:0 40px;
    &.not-top {
      transform: translate(0, -100%);
    }
    a {
      text-decoration: none;
      color: #e6e6e6;
    }

    .el-menu-item {
      width: 90px;
      text-align: center;
      font-size: 18px;
      color: #e6e6e6;
      font-weight: 600;
      &:hover {
        background-color: rgba(231, 230, 230, 0.1);
        color: rgb(219, 165, 183);
      }
    }
  }

  .el-menu-item.is-active {
    border-bottom: 2px solid rgb(219, 165, 183);
    border-top: 2px solid rgb(219, 165, 183);
    font-weight: 600;
    background-color: rgba(231, 230, 230, 0.1);
  }
}
.el-container {
  width: 1050px;
  margin: auto;
}
</style>
