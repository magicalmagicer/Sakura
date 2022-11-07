<template>
  <div class="main">
    <div class="left">
      <!-- 文章内容 -->
      <article-contents id="article" :data="data" :v-loading="loading" :likeCount="likeCount"></article-contents>
      <!-- 评论区 -->
      <comment :article_id="id" :author_id="data.author_id" id="comment"></comment>
    </div>
  </div>
</template>

<script>
import articleContents from '../components/articleContents.vue'
import comment from '../components/comment.vue'
import Cookie from 'js-cookie'

export default {
  components: {
    articleContents,
    comment
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      // 文章id
      id: this.$route.params.id,
      // 文章数组
      data: [],
      likeCount: 0,
      changeStyle: false,
      isClick: true,
      loading: true,
      catalog: [],
      catalogProps: {
        container: '.left'
      }
    }
  },
  created() {
    this.GetArticleDetail()
    this.getLikeStatus()
    this.visit()
  },
  methods: {
    // 文章访问量
    async visit() {
      // console.log('进入了该函数')
      const { data: res } = await this.$http.get(this.$originUrl + '/article/visit', { params: { id: this.$route.params.id } })
      // console.log(res)
    },
    // 获取文章点赞状态
    async getLikeStatus() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/likeStatus', { params: { id: this.$route.params.id, liker_id: this.$store.state.id } })
      if (res.like_status === true) {
        this.isClick = true
      } else {
        this.isClick = false
      }
    },
    // 获取文章详情页
    async GetArticleDetail() {
      let that = this
      const { data: res } = await this.$http.get(this.$originUrl + '/article/details', { params: { id: that.id } })
      // console.log('文章详情 ')
      // console.log(res)
      this.data = res.data[0]
      // console.log(this.data)
      // console.log(this.data.id)
      this.likeCount = res.data[0].like_count
      // this.$children[0].$children[0].$forceUpdate()
    },
    async addLike() {
      if (Cookie.get('token')) {
        if (this.isClick == true) {
          // 如果为true则已经点赞，直接返回
          return this.$message.info('您已经为该文章点赞！')
        }
        const { data: res } = await this.$http.get(this.$originUrl + '/article/like', { params: { id: this.$route.params.id, liker_id: this.$store.state.id } })
        console.log(res)
        if (res.status !== 0) return
        this.$message.success('点赞成功！')
        this.likeCount = this.likeCount + 1
        this.isClick = true
      } else {
        this.$message({
          message: '请登录后进行操作,即将跳转到登录页面',
          type: 'warning'
        })
        setTimeout(() => {
          this.$router.push({ name: 'Log' })
        }, 3000)
      }
    },
    toComment() {
      // document.querySelector('#comment').scrollIntoView(true)
    }
  }
}
</script>

<style lang="less">
.main {
  margin-top: 40px;
  display: flex;
}
.left {
  background-color: #fff;
  padding-bottom: 50px;
}
.right {
  margin-left: 30px;
  width: 270px;
  .el-tag {
    margin-right: 10px;
  }
}
</style>
