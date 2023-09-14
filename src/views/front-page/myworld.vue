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
                  <i class="el-icon-document"></i>
                  <span slot="title" class="span">
                    给我留言
                    <p class="num" v-if="count1">{{ count1 }}</p>
                  </span>
                </el-menu-item>
                <el-menu-item :index="path.message2" @click="changePath(path.message2)">
                  <i class="el-icon-chat-dot-round"></i>
                  <span slot="title" class="span">
                    回复我的
                    <p class="num" v-if="count2">{{ count2 }}</p>
                  </span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="path.likers" @click="changePath(path.likers)">
              <i class="el-icon-view"></i>
              <span slot="title">谁关注我</span>
              <p class="num" v-if="count3">{{ count3 }}</p>
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
import Cookie from 'js-cookie'
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
      activePath: '',
      leaveMessage: [],
      replyToComment: [],
      likeMessage: [],
      count1: 0,
      count2: 0,
      count3: 0
    }
  },
  created() {
    // console.log(this.$route)
    // console.log(this.path.card)
    this.activePath = this.$route.path
    this.getMessage()
  },
  watch: {
    '$store.state.messageStatusChange': function() {
      // console.log('消息状态改变!')
      this.getMessage()
    }
  },
  methods: {
    changePath(nowPath) {
      this.activePath = nowPath
      // console.log(this.activePath)
    },
    // 获取消息列表
    async getMessage() {
      // const { data: res1 } = await this.$http.get(this.$originUrl + '/article/getmessage', { params: { id: Cookie.get('user_id'), type: 1 } })
      // const { data: res2 } = await this.$http.get(this.$originUrl + '/article/getmessage', { params: { id: Cookie.get('user_id'), type: 2 } })
      // const { data: res3 } = await this.$http.get(this.$originUrl + '/article/getlike', { params: { id: Cookie.get('user_id') } })
      var p1 = this.$http.get(this.$originUrl + '/article/getmessage', { params: { id: Cookie.get('user_id'), type: 1 } })
      var p2 = this.$http.get(this.$originUrl + '/article/getmessage', { params: { id: Cookie.get('user_id'), type: 2 } })
      var p3 = this.$http.get(this.$originUrl + '/article/getlike', { params: { id: Cookie.get('user_id') } })
      Promise.all([p1, p2, p3])
        .then(result => {
          // console.log(result[0])
          let { data: res1 } = result[0]
          let { data: res2 } = result[1]
          let { data: res3 } = result[2]
          this.leaveMessage = res1.data
          this.replyToComment = res2.data
          this.likeMessage = res3.data
          // 提交vuex数据
          this.$store.commit('setLeaveMessage', this.leaveMessage)
          this.$store.commit('setReply', this.replyToComment)
          this.$store.commit('setLikeMessage', this.likeMessage)
          // console.log(this.likeMessage.length)
          // 消息数量
          this.count1 = res1.count
          this.count2 = res2.count
          this.count3 = res3.count
        })
        .catch(err => {
          this.$message.warning(err)
        })

      // console.log(res1)
      // console.log(res2)

      // console.log(res3)
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu-item {
  position: relative;
  .num {
    position: absolute;
    top: 0;
    font-family: 'cute';
    right: 0;
    width: 12px;
    height: 12px;
    background-color: rgb(204, 80, 80);
    color: #fff;
    font-size: 10px;
    border-radius: 6px;
    line-height: 12px;
  }
}
/deep/ .el-menu-item:hover {
  color: #000 !important;
}
.background {
  border: none;
  background: url('../../assets/information.jpg') no-repeat;
  background-size: cover;
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
.container {
  width: 100%;
}
/deep/ .el-menu {
  background-color: transparent;
  border: none;
}
.el-aside {
  margin-top: 25px;
  overflow: visible;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
