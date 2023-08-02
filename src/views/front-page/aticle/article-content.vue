<template>
  <div class="contents">
    <div class="articleBody">
      <!-- 文章头 -->
      <div class="header">
        <h1>{{ data.title }}</h1>
        <div class="info">
          <span class="el-icon-time"> 发表时间:{{ data.time | timer() }} </span>
          <span class="el-icon-view"> 阅读 ({{ data.visited_count }})</span>
          <span class="icon el-icon-thumb"> 点赞 ({{ likeCount }})</span>
          <span class="icon el-icon-edit">
            作者: <span class="black">{{ data.nickname ? data.nickname : data.username }}</span></span>
        </div>
        <el-button type="text" size="mini" class="back" @click="backward">&lt;返回</el-button>
        <el-button type="text" size="mini" class="edit" @click="toEditor" v-if="myArticle">感觉不满意？再改改吧</el-button>
      </div>

      <!-- 文章内容 -->
      <div class="body">
        <mavon-editor v-model="data.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" codeStyle="atom-one-dark" :boxShadow="false"> </mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log('文章详情数据')
    // console.log(this.data.author_id, this.$store.state.id)
    // // console.log(myArticle)
  },
  props: ['data', 'loading', 'likeCount'],
  filters: {
    timer(str) {
      if (str != null) return str.substring(0, 10)
      else return ''
    }
  },
  computed: {
    myArticle() {
      // return this.data.author_id == 1
      return this.data.author_id == this.$store.state.id
    }
  },
  data() {
    return {
      navTree: []
    }
  },
  methods: {
    // 编辑文章
    toEditor() {
      this.$router.push(`/write/${this.$route.params.id}`)
    },
    backward() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.contents .articleBody .header .black {
  color: #1890ff;
  // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  // font-family: 'cute';
}
.info {
  vertical-align: baseline;
}
.contents {
  margin-top: 20px;
  width: 1000px;
  background-color: #fff;
  .articleBody {
    padding: 10px 20px;
    .header {
      padding-bottom: 20px;
      width: 100%;
      position: relative;
      h1 {
        font-size: 36px;
      }
      .back {
        position: absolute;
        right: 0;
        top: 0;
      }
      .edit {
        color: yellow;
        position: absolute;
        right: 0;
        bottom: 20px;
        // top: 30px;
      }
      span {
        font-size: 14px;
        color: #999;
        margin-right: 20px;
      }
    }
  }
}
</style>
