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
            <el-submenu :index="path.message">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">我的消息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="path.message1" @click="changePath(path.message1)">
                  <!-- el-icon-document -->
                  <i class="el-icon-document"></i>
                  <span slot="title">给我留言 </span>
                </el-menu-item>
                <el-menu-item :index="path.message2" @click="changePath(path.message2)">
                  <i class="el-icon-chat-dot-round"></i>
                  <span slot="title">回复我的 </span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
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
      path: {
        card: `/myworld/${this.$route.params.id}/mycard`,
        article: `/myworld/${this.$route.params.id}/myarticle`,
        message: `/myworld/${this.$route.params.id}/mymessage`,
        message1: `/myworld/${this.$route.params.id}/mymessage/leavemessage`,
        message2: `/myworld/${this.$route.params.id}/mymessage/replytocomment`,
        likers: `/myworld/${this.$route.params.id}/mylikers`
      },
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
/deep/ .el-menu-item-group__title {
  padding: 0;
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
.el-submenu {
  /deep/ .el-menu-item {
    min-width: 100px;
    padding-left: 50px !important;
  }
}

/deep/ .el-menu {
  background-color: transparent;
  border: none;
}
.el-aside {
  // background-color: transparent;
  margin-top: 25px;
  // height: 230px;
  overflow: visible;
  color: #333;
  text-align: center;

  // line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
