<template>
  <el-container>
    <!-- 左边内容 -->
    <el-aside class="margin">
      <div class="wow slideInLeft">
        <!-- 博客信息 -->
        <el-card class="box-card" style="margin-bottom: 30px">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-coffee"></i>博客信息</span>
          </div>
          <div class="ItemList">
            <span>
              <i class="el-icon-coffee-cup"></i>
              文章总数
            </span>
            <span> {{ count }}篇 </span>
          </div>
          <div class="ItemList">
            <span>
              <i class="el-icon-goblet"></i>
              运行天数
            </span>
            <span> {{ day }}天 </span>
          </div>
        </el-card>
        <!-- 排行榜 -->
        <el-card style="margin-bottom: 30px">
          <div class="active">
            <div class="clearfix">
              <span>本月用户活跃度排行</span>
            </div>
            <div class="active_item" v-for="(item,index) in activityList" :key="index">
              <div class="active_title">
                <!-- <div class="index"></div> -->
                <div class="active_name">{{index + 1 }}.{{item.nickname}}</div>
                <div class="activity">{{item.times + '次'}}</div>
              </div>
              <el-progress :stroke-width="18" :percentage="progressData(item.times)" :color="selectColor(index)" :text-inside="true"></el-progress>
            </div>
          </div>
        </el-card>
        <!-- 文章分类 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章分类</span>
          </div>
          <div class="tag">
            <el-tag @click="tagEvent('')" color="rgb(176, 250, 185)" class="hover">全部</el-tag>
            <el-tag plain v-for="(item, index) in AllArticleClassName" :key="index" @click="tagEvent(item.name)" color="rgb(176, 250, 185)" class="hover">
              {{ item.name }}
            </el-tag>
          </div>
        </el-card>

      </div>
    </el-aside>

    <!-- 中间主要内容 -->
    <el-main class="wow slideInRight">
      <!-- 搜索框 -->
      <div class="search">
        <el-input size="medium" placeholder="请输入文章名进行搜索" v-model="input" debounce @keyup.enter.native="search" clearable> </el-input>
        <el-button type="primary" size="mini" @click="search">搜索</el-button>
      </div>

      <!-- 文章页 -->
      <el-card class="box-card card_content" shadow="hover" :body-style="{ width: '100%' }" v-for="(item, index) in AllArticle" :key="index">
        <!-- 文章首部 -->
        <div slot="header" class="clearfix articlebg">
          <router-link :to="{ name: 'Detail', params: { id: item.id } }">
            <h3>
              {{ item.title }}
            </h3>
            <div class="tag">
              <el-tag type="primary">{{ item.category }}</el-tag>
            </div>
          </router-link>
          <el-image-viewer v-if="imgViewerVisible" :url-list="picList" :on-close="closeViewer" />
          <el-image style="width: 100px; height: 80px" ref="preview" @click="onPreview(item.pic_url)" :src="item.pic_url" fit="cover"></el-image>
        </div>
        <!-- 文章内容部分预览 -->
        <div class="text item" v-html="compiledMarkdown(item.content)">
          <!-- {{ item.content | convert}} -->
        </div>
        <!-- 点赞量 -->
        <p class="hot">
          <span class="el-icon-thumb">点赞({{ item.like_count }})</span>
          <span class="el-icon-reading"> 阅读({{ item.visited_count }})</span>
          <span class="el-icon-time">{{ item.create_time }}</span>
        </p>
      </el-card>

      <!-- 分页 -->
      <div class="block">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="count" @current-change="indexChange"> </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import WOW from 'wowjs'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { marked } from 'marked'
var rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
  smartypants: false
})

export default {
  components: {
    elImageViewer: ElImageViewer
    // FooterBar
  },

  data() {
    return {
      picList: [],
      imgViewerVisible: false,
      input: '',
      currentPage: 1,
      // 总文章数
      count: 0,
      // 总标签数
      tagCount: 0,
      // 文章列表
      AllArticle: [],
      // 点赞数量数组
      likes: [],
      // 所以文章分类
      AllArticleClassName: [],
      pageSize: 3,
      isShow: true,
      // 博客运行时间
      day: 0,
      key: '',
      activityList: [],
      progressColor: ['#1bf8f3', '#3196e8', '#feb046', '#e8484f', '#9174e4'],
      first: 0
    }
  },
  created() {
    this.getUserActivity()
    this.GetAllArticle(this.currentPage, this.pageSize)
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
    this.runtime()
  },
  computed: {
    // 渲染文章内容预览
    compiledMarkdown() {
      return function (text) {
        return marked(text)
      }
    },
    // 计算百分比
    progressData() {
      return function (num) {
        return (Number(num) / Number(this.first)).toFixed(2) * 100
      }
    }

  },
  methods: {
    // 预览图关闭
    closeViewer() {
      this.imgViewerVisible = false
    },
    onPreview(picUrl) {
      // console.log(picUrl)
      this.picList = [picUrl]
      // this.$refs.preview.clickHandler()
      this.imgViewerVisible = true
    },
    // 博客运行时间
    runtime() {
      // 初始时间，日/月/年 时:分:秒
      const start = new Date('2022/4/19 0:00:00')
      let nowTime = new Date()
      let difference = nowTime.getTime() - start.getTime()
      let oneDaysecond = 24 * 60 * 60 * 1000
      let d = difference / oneDaysecond // 时间差 / 一天的毫秒数  = 天数
      this.day = Math.floor(d) //获取天数（向下取整）
    },
    // 搜索文章
    async search() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/search', {
        params: { key: this.input, curPage: this.currentPage, pageSize: this.pageSize }
      })
      if (res.status === 1) return this.$message.error('搜索文章失败！')
      this.AllArticle = res.data
      this.count = res.count
      this.AllArticle.map(item => {
        item.create_time = item.time.slice(0, 10)
      })
      // this.GetAllArticleClassName()
    },
    // 当前页变化
    indexChange(index) {
      this.GetAllArticle(index, this.pageSize)
    },
    // 点击标签筛选
    tagEvent(classname) {
      this.key = classname
      console.log(this.key)
      this.GetAllArticle()
    },
    // 获取文章
    async GetAllArticle() {
      // 获取全部文章
      if (!this.key) {
        var { data: res } = await this.$http.get(this.$originUrl + '/article/get', { params: { curPage: this.currentPage, pageSize: this.pageSize } })
      } else {
        // 根据标签获取文章
        var { data: res } = await this.$http.get(this.$originUrl + '/article/get', { params: { key: this.key, curPage: this.currentPage, pageSize: this.pageSize } })
      }
      if (res.status === 1) {
        if (res.message === '身份认证失败！') this.$router.push('/Log')
        return
      }
      this.AllArticle = res.data
      this.count = res.count
      this.$store.commit('setCount', this.count)
      // 截取时间
      this.AllArticle.map(item => {
        item.create_time = item.time.slice(0, 10)
      })
      this.GetAllArticleClassName()
    },

    // 获取全部文章标签
    async GetAllArticleClassName() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/cates')
      this.AllArticleClassName = res.data
      this.tagCount = this.AllArticleClassName.length
      this.$store.commit('setTagCount', this.tagCount)
    },
    // 获取用户活跃度
    async getUserActivity() {
      let time = new Date().toLocaleDateString().split('/')
      let month = time[1].length > 1 ? time[1] : '0' + time[1]
      let date = time[0] + '-' + month
      // console.log(date);
      const { data: res } = await this.$http.get(this.$originUrl + '/my/activity', {
        params: {
          date
        }
      })
      if (res.status !== 0) return
      this.activityList = res.data

      this.first = res.data[0].times

      console.log(this.first);
    },
    // 排行榜颜色
    selectColor(index) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
      return color;
      // switch (index) {
      //   case 0:
      //     return this.progressColor[index]
      //     break;
      //   case 1:
      //     return this.progressColor[index]
      //     break;
      //   case 2:
      //     return this.progressColor[index]
      //     break;
      //   case 3:
      //     return this.progressColor[index]
      //     break;
      //   case 4:
      //     return this.progressColor[index]
      //     break;
      //   case 5:
      //     return this.progressColor[index]
      //     break;
      // }
    },



  }
}
</script>

<style lang="less" scoped>
#app {
  .margin {
    // max-height: ;
    margin-top: 96px;
    /deep/ .el-card {
      width: 308px;
    }
    .active {
      .active_item {
        margin-top: 10px;
        .active_title {
          display: flex;
          font-size: 13px;
          .index {
            font-size: 15px;
            font-weight: 700;
          }
          justify-content: space-between;
          .active_title {
            margin-bottom: 2px;
          }
        }
      }
    }
  }
  .el-loading-spinner {
    i {
      color: rgb(219, 165, 183);
    }
    p {
      color: rgb(219, 165, 183);
    }
  }
  .articlebg {
    position: relative;
  }
  .el-container {
    .el-aside {
      padding: 30px 20px;
      padding-left: 0;
      box-sizing: content-box;
      .box-card {
        // background: rgba(255, 255, 255, 0.829);
        width: 293px + 15px;
        /deep/ .el-card__body {
          padding-top: 0;
          padding: 10px;
        }
        .el-card__header {
          // margin-bottom: 10px;
          width: 100%;
          padding: 18px 0 0 30px;
          font-size: 24px;
          color: #707070;
        }
        .tag {
          padding: 5px;
          .hover {
            cursor: pointer;
            margin: 4px;
          }
          display: flex;
          // justify-content: space-between;
          flex-wrap: wrap;
          .el-button {
            margin-right: 10px;
            margin-bottom: 5px;
            margin-left: 0;
          }
          .is-plain:hover {
            background: #fff;
            border-color: brown;
            color: brown;
          }
          .is-plain:focus {
            background: brown;
            border-color: brown;
            color: #fff;
          }
        }

        .ItemList {
          padding: 10px 10px;
          cursor: pointer;
          color: #555;
          border-bottom: 1px solid #ebeef5;
          // transition: all 0.6s;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ItemList:hover {
          background: #f3f4f5;
          color: #909399;
          padding-left: 10px;
        }
        .ItemList:last-child {
          border-bottom: none;
        }
      }
    }
    .el-main {
      // background: transparent;
      // background-color: #fff;
      margin: 30px 0;
      padding-left: 155px;
      box-sizing: content-box;
      padding-bottom: 20px;
      // border-left: 1px dashed rgb(201, 201, 201);
      overflow: unset;
      .search {
        display: flex;
        text-align: center;
        justify-content: space-between;
        margin-left: 100px;
        width: 300px;
        margin-top: 0px;
        margin-bottom: 30px;
        .el-button {
          margin-left: 0px;
          border-radius: 0;
          font-size: 13px;
        }
        .el-input__inner {
          border-radius: 0;
          border: 1px solid #ccc;
        }
      }

      .box-card {
        background-color: #d8ddf9;
        // background-color: rgba(59, 83, 223, 0.2);
        margin-bottom: 30px;
        width: 510px;
        border-left: 1px dashed rgb(201, 201, 201);
        .el-card__header {
          padding-bottom: 10px;
          width: 100%;
          a {
            text-decoration: none;
            color: #606266;
          }

          .router-link-active {
            text-decoration: none;
            color: #606266;
          }
        }
        h3 {
          // position: relative;
          margin: 0;
          margin: 10px 0;
          font-size: 24px;
          width: 342px;
          // height: 100px;
        }
        .el-image {
          cursor: crosshair;
          position: absolute;
          right: 0;
          top: -10px;
        }
        .tag {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .el-icon-time {
          position: absolute;
          right: 0;
          top: 0;
          color: #8a8a8a;
          font-size: 14px;
          // margin: 15px 0px;
        }
        /deep/ .el-card__body {
          margin: 0;
          // width: %;
          width: 480px;
          padding-top: 0;
          box-sizing: border-box;
          .text {
            overflow: hidden;
            display: -webkit-box;
            word-break: break-all;
            // height: 160px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            font-size: 14px;
            -webkit-overflow-scrolling: touch;
          }
          .hot {
            position: relative;
            margin-bottom: 0px;
            // margin-top: 5px;
            color: #999;
            font-size: 13px;
            span {
              margin-right: 15px;
            }
          }
        }
      }
      .el-pagination {
        .btn-prev {
          color: #8a8a8a;
        }
        .btn-next {
          color: #8a8a8a;
        }
      }
      .el-pager li.active {
        color: rgb(219, 165, 183);
      }
      .el-pager li {
        color: #8a8a8a;
      }
    }
    // .el-main ::before,
    .box-card ::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      filter: blur(20px);
      z-index: -1;
      margin: 0px;
    }
  }
}
</style>
