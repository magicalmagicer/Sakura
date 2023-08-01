<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的消息</el-breadcrumb-item>
      <el-breadcrumb-item>给我留言</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="messageTitle">Message to me</h1>
    <!-- 留言 -->
    <div class="box-card" v-if="leaveMessage.length">
      <!-- 具体内容 -->
      <div class="content text item" v-for="(item, index) in leaveMessage" :key="index">
        <el-tag v-if="item.status == 0" class="unread" size="small" :hit="true">未读</el-tag>
        <div class="info">
          <div class="information">
            <div class="username">
              <!-- 评论者昵称 -->
              {{ item.nickname ? item.nickname : item.username }}
              <!-- {{ item.nickname ? item.nickname : item.username }} -->
            </div>
            <div class="article">
              给你的文章 <span>《 {{ item.title }} 》</span> 留言:
            </div>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="detail">
          <div class="reply">
            <!-- 写的不错！ -->
            {{ item.content }}
            <!-- {{ item.status }} -->
          </div>
          <el-button style="float: right; padding: 3px 0" type="text" @click="changeMessageStatus(item.id)" :disabled="item.status == 1 ? true : false" size="mini">已阅</el-button>
        </div>
        <div class="footer">
          <!-- 时间 -->
          <div class="time">{{ item.time | changeShow }}</div>
          <!-- <el-button type="text">文字按钮</el-button> -->
          <el-button type="text" class="el-icon-chat-round" :plain="true" @click="toReply(item.article_id)">回复</el-button>
        </div>
      </div>
    </div>
    <div class="nothing" v-else>还没有人给你的评论回复哦~</div>
  </div>
</template>

<script>
export default {
  filters: {
    changeShow(time) {
      try {
        if (time) {
          const a = time.split(' ')
          return a[0] + ' ' + a[1].substring(0, 8)
        }
        return ''
      } catch (e) {
        return ''
      }
    }
  },
  data() {
    return {
      // leaveMessage: []
    }
  },
  computed: {
    leaveMessage() {
      return this.$store.state.leaveMessage
    }
    // messageStatusChange() {
    //   return this.$store.state.messageStatusChange
    // }
  },
  created() {
    // console.log(this.$store.state.leaveMessage)
  },
  methods: {
    // 跳转文章
    toReply(id) {
      this.$router.push(`/detail/${id}`)
    },
    async changeMessageStatus(id) {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/messagestatus', { params: { id } })
      if (res.status === 0) {
        this.$store.commit('setMessageStatusChange', !this.$store.state.messageStatusChange)
        // console.log(!this.$store.state.messageStatusChange)
      } else {
        this.$message.info('修改消息状态失败！')
      }
      // console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
.nothing {
  text-align: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.detail {
  padding: 10px;
}
.reply {
  color: #222;
}
.footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: #999;
  .time {
    margin-right: 10px;
    color: #fc5531;
  }
  /deep/ .el-button {
    padding: 0;
    background-color: transparent;
    &:hover {
      color: paleturquoise;
    }
  }
  /deep/ .el-button--text {
    color: #999;
    font-size: 12px;
    outline: none;
    border: none;
  }
}
.information {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Microsoft YaHei', 'Microsoft Sans Serif', 'Microsoft SanSerf', '微软雅黑';
  font-size: 14px;
  // margin-bottom: 10px;
  .username {
    font-weight: 600;
    margin-right: 10px;
  }
  .article {
    font-size: 14px;
    color: #999;
    span {
      color: #222;
      font-family: 'Microsoft YaHei', 'Microsoft Sans Serif', 'Microsoft SanSerf', '微软雅黑';
    }
  }
}
.clearfix {
  margin-bottom: 20px;
  font-size: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 560px;
  margin: 0 auto;
  .content {
    position: relative;
    padding: 10px 20px;
    background: linear-gradient(60deg, #edff7f, #fff666);
    border-radius: 10px;
    .unread {
      position: absolute;
      top: -5px;
      right: -5px;
      // border-radius: 0;
      border-radius: 2px;
      color: black;
      font-family: '宋体';
      // border-bottom: 0;
      // border-left: 0;
      border: none;
      background-color: greenyellow;
    }
  }
}
/deep/ .messageTitle {
  font-family: 'cute';
  text-align: center;
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 16px;
  // font-family: 'cute';
}
</style>
