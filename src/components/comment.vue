<template>
  <div>
    <div class="commentTitle">
      <p>留下你的足迹吧~</p>
    </div>
    <div class="commentAction">
      <div class="reply">
        <el-input type="textarea" autosize placeholder="写下你的评论....." v-model="textarea"> </el-input>
        <el-button class="submit" @click="SendComment()">提交</el-button>
        <!-- <el-button @click="GetArticleComment">获取评论</el-button> -->
      </div>
      <!-- 评论列表 -->
      <ul v-if="isEmpty == false">
        <li class="commentItem" v-for="(item, index) in commentArray" :key="index">
          <!-- 评论 -->
          <div class="content">
            <div class="info">
              <!-- 评论者昵称 -->
              <div class="name">
                <div class="information">
                  <!-- 评论人头像 -->
                  <el-avatar :src="item.avatar ? item.avatar : '#'" class="user" :icon="item.avatar ? '' : 'el-icon-user-solid'"></el-avatar>
                  {{ item.nickname ? item.nickname : item.username }}
                </div>
                <div class="time">{{ item.time | changeShow }}</div>
              </div>
              <!-- 时间 -->
            </div>
            <!-- 评论内容 -->
            <div class="detail">{{ item.content }}</div>
            <div class="button">
              <el-input v-model="reply" ref="iptRef" clearable v-show="showReplyBox == item.comment_id" width="200px" size="small" :placeholder="'回复 @' + (item.nickname ? item.nickname : item.username)" @keyup.enter.native="replyToComment(item.comment_id)" @blur="showReplyBox = 0"></el-input>
              <el-button type="text el-icon-chat-dot-square" @click="showReplyIpt(item.comment_id, index)" :disabled="item.reply !== null || author_id !== visitor_id">回复</el-button>
              <el-button class="delete" type="text" @click="handleDelect(item.comment_id)" :disabled="author_id !== visitor_id">删除</el-button>
            </div>
          </div>

          <!-- 评论回复 -->
          <div class="replyToComemnt content" v-if="item.reply">
            <div class="info">
              <!-- 时间 -->
              <div class="time">{{ item.reply_time | changeShow }}</div>
            </div>
            <!-- 回复内容 -->
            <div class="details">作者回复：{{ item.reply }}</div>
          </div>
        </li>
      </ul>
      <div class="emptyBox" v-else>
        <!-- <div class="el-icon-chat-square"></div> -->
        <p>暂无评论，可惜~</p>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  inject: ['reload'],
  props: ['article_id', 'author_id'],

  filters: {
    changeShow(time) {
      if (time) {
        const a = time.split('T')
        // const b = time.substring(11, 8)
        return a[0] + ' ' + a[1].substring(0, 8)
      } else return ''
    }
  },
  data() {
    return {
      reply: '',
      textarea: '',
      // 评论数组
      commentArray: [],
      isEmpty: false,
      username: Cookie.get('username'),
      defaultImgUrl: '../assets/user.png',
      showReplyBox: 0
    }
  },
  computed: {
    visitor_id() {
      return this.$store.state.id
    }
  },
  methods: {
    showReplyIpt(id, index) {
      // console.log(id)
      this.showReplyBox = id
      // console.log(index)
      // console.log(this.$refs.iptRef[index])
      this.$nextTick(() => {
        this.$refs.iptRef[index].focus()
      })
    },
    // 回复评论
    async replyToComment(id) {
      const { data: res } = await this.$http.post(
        this.$originUrl + '/article/replycomment',
        this.$qs.stringify({
          comment_id: id,
          content: this.reply,
          article_id: this.article_id
        })
      )
      if (res.status === 1) return this.$message.warning('回复评论失败！')
      this.$message.success('回复评论成功！')
      this.reply = ''
      // console.log(res.data)
      this.showReplyBox = 0
      this.GetArticleComment()
      // console.log(id)
    },
    // 管理员删除评论
    handleDelect(id) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发起删除的网络请求
          const { data: res } = await this.$http.post(this.$originUrl + '/article/deletecomment', this.$qs.stringify({ comment_id: id, visitor_id: this.visitor_id, article_id: this.article_id }))

          if (res.status !== 0) return this.$message.warning('删除评论失败！')
          console.log(res)
          this.$message.success('删除评论成功！')
          this.GetArticleComment()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 文章评论
    async GetArticleComment() {
      if (this.article_id) {
        const { data: res } = await this.$http.get(this.$originUrl + '/article/getcomment', {
          params: { article_id: this.article_id }
        })
        // console.log(res.data)
        this.commentArray = res.data
        if (this.commentArray.length == 0) this.isEmpty = true
      }
    },
    // 提交评论
    async SendComment() {
      if (Cookie.get('token')) {
        // console.log(this.$route.params.id)
        // console.log(typeof this.$route.params.id)
        if (this.textarea == '') {
          return this.$message.warning('请写下评论再提交吧~')
        }
        // 发起评论请求
        const { data: res } = await this.$http.post(
          this.$originUrl + '/article/comment',
          this.$qs.stringify({
            content: this.textarea,
            // 有则发送文章id，无则发送0
            article_id: this.article_id,
            from_id: this.$store.state.id
          })
        )
        if (res.status === 1) return this.$message.warning('评论失败！')
        this.$message.success('评论成功！')
        // .then(res => {
        this.GetArticleComment()
        this.textarea = ''
        // })
      } else {
        this.$message({
          message: '请登录后进行操作,即将跳转到登录页面',
          type: 'warning'
        })
        setTimeout(() => {
          this.$router.push({ name: 'Log' })
        }, 2000)
      }
    }
  },
  created() {
    this.GetArticleComment()
  }
}
</script>

<style lang="less">
.el-input__inner {
  width: 200px;
  margin-left: 200px;
  padding-left: 5px;
  font-size: 12px;
}
.content {
  width: 100%;
}
.el-input__inner::placeholder {
  color: #555;
}
.commentTitle {
  text-align: center;
  margin: 20px 0;
  p {
    font-size: 28px;
    font-weight: 600;
    color: brown;
  }
}
.replyToComemnt {
  margin-left: 100px;

  border-top: 1px dashed #ccc;
  // display: block;
}
.information {
  display: flex;
  align-items: center;
}
.reply {
  margin-bottom: 26px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  // justify-content: start;
  .el-textarea__inner {
    width: 500px;
    border-radius: 19px;
    transition: all 0.3s cubic-bezier(0.19, 0.4, 0.17, 0.85);
    background-color: #f2f2f2;
    color: #666;
  }
  .submit {
    // margin-right: 50px;
    color: #fff;
    font-size: 15px;
    width: 60px;
    height: 36px;
    background-color: pink;
    border-radius: 60px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-button:focus {
    // border-color: rgb(136, 25, 25);
    background-color: red;
    color: #fff;
  }
  .el-button:hover {
    // border-color: rgb(136, 25, 25);
    background-color: lightblue;
    color: #fff;
  }
}

ul {
  padding: 0 40px;
  list-style: none;
  .el-button {
    color: #999;
  }
  .el-button:focus {
    color: #666;
  }
  .el-button:hover {
    color: #666;
  }
  .avatar {
    width: 40px;
    height: 40px;
    font-size: 24px;
    text-align: center;
    color: #b13713;
    line-height: 40px;
    margin-right: 10px;
    border-radius: 100%;
    transition: all 0.5s ease;
    border: 1px solid #e5e5e5;
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333;
    padding-bottom: 5px;
  }
  .time {
    color: #999;
    font-size: 14px;
    margin: 10px 0;
  }
  .detail {
    // margin-top: 10px;
    margin-left: 60px;
  }
  .commentItem {
    padding: 10px;
    margin: 10px 0;
    overflow: hidden;
    display: flex;

    flex-wrap: wrap;
    // align-items: center;
    // position: relative;
    border-bottom: 1px solid #c9c9c9;
  }
  .delete {
    color: red;
  }
}
.button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // margin-right: 0;
}
.user {
  // align-items: center;
  margin-top: -9px;
  margin-right: 15px;
  width: 40px;
  height: 40px;
  font-size: 24px;
}
.emptyBox {
  color: #999;
  margin: 20px auto;
  font-size: 60px;
  text-align: center;

  p {
    font-family: 'cute';
    margin-top: 5px;
    font-size: 16px;
  }
}
</style>
