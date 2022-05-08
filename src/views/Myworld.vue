<template>
  <div class="container">
    <el-container>
      <el-header>
        <h1 class="head">My World</h1>
      </el-header>
      <el-container>
        <el-aside width="160px">
          <el-menu :default-active="activePath" router class="el-menu-vertical-demo" active-text-color="yellow" text-color="#fff">
            <el-menu-item :index="path.card" @click="changePath(path.card)">
              <i class="el-icon-postcard"></i>

              <span slot="title">我的资料</span>
            </el-menu-item>
            <el-menu-item :index="path.article" @click="changePath(path.article)">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">我的文章 </span>
            </el-menu-item>
            <el-menu-item :index="path.message" @click="changePath(path.message)">
              <i class="el-icon-message"></i>
              <span slot="title">我的消息</span>
            </el-menu-item>
            <el-menu-item :index="path.likers" @click="changePath(path.likers)">
              <i class="el-icon-view"></i>
              <span slot="title">谁关注我</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-card :class="activePath == path.card ? 'background' : ''">
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // props: ['id'],
  data() {
    return {
      path: { card: `/myworld/${this.$route.params.id}/mycard`, article: `/myworld/${this.$route.params.id}/myarticle`, message: `/myworld/${this.$route.params.id}/mymessage`, likers: `/myworld/${this.$route.params.id}/mylikers` },
      activePath: ''
    }
  },
  created() {
    this.activePath = this.path.card
    // console.log(this.activePath)
    // console.log(this.id)
  },
  methods: {
    changePath(nowPath) {
      this.activePath = nowPath
      // console.log(this.activePath)
    }
  }
}
</script>
<style lang="less" scoped>
.background {
  border: none;
  background: url('../assets/information.png') no-repeat;
  background-size: cover;
  // background-clip: cov;
}
.el-header {
  // background-color: black;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 100px !important;
}
.head {
  margin: auto;
  // font-size: 36px;
  // color: purple;
  font: 700 60px 'Comic Sans MS';
  color: white;
  text-shadow: 10px 0 20px #fdec84, 10px -10px 30px #ffae35;
}
.el-menu-item {
  padding: 0 !important;
}
.el-menu {
  background-color: transparent;
}
.el-aside {
  // background-color: transparent;
  margin-top: 25px;
  height: 230px;
  color: #333;
  text-align: center;

  // line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
