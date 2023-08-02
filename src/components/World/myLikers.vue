<template>
  <div class="container">
    <h1 class="messageTitle">我的点赞</h1>
    <div class="know" @click="changeLikeStatus">我知道啦~</div>
    <div class="content" v-for="(item, index) in likeMessage" :key="index">
      <div class="detail">
        <div class="left">
          <span class="liker"> {{ item.liker_nickname ? item.liker_nickname : item.liker_name }} </span> 给你的文章 <span class="article">{{ item.article_title }}</span> 点赞啦！
          <p class="time">{{ item.time | changeShow }}</p>
        </div>
        <div class="right el-icon-view" @click="toSee(item.article_id)" title="去看看"></div>
      </div>
      <i class="divider"></i>
    </div>
    <div v-if="likeMessage.length === 0" class="nothing">还没人给你点赞哦~</div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.likeMessage.length)
  },
  computed: {
    likeMessage() {
      return this.$store.state.likeMessage
    }
  },
  filters: {
    changeShow(time) {
      if (time) {
        const a = time.split('T')
        // const b = time.substring(11, 8)
        return a[0] + ' ' + a[1].substring(0, 8)
      } else return ''
    }
  },
  methods: {
    toSee(id) {
      this.$router.push(`/detail/${id}`)
    },
    async changeLikeStatus() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/changelike', {
        params: {
          id: this.$store.state.id
        }
      })
      if (res.status == 0) {
        this.$store.commit('setMessageStatusChange', !this.$store.state.messageStatusChange)
        this.$message.success('成功将所有点赞消息标记为已读！')
      }
      // console.log(res.data)
    }
  }
}
</script>
<style lang="less" scoped>
.nothing {
  text-align: center;
}
.container {
  position: relative;
  padding: 5px;
  .divider {
    display: block;
    height: 0;
    border: 1px dashed #ccc;
  }
  .know {
    position: absolute;
    right: 40px;
    top: 20px;
    color: #999;
    font-size: 12px;
    cursor: pointer;
  }
}
.detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  // background-color: greenyellow;
  .left {
    .liker {
      font-weight: bold;
    }
    .article {
      color: red;
      font-family: 'cute';
    }
    .time {
      color: #999;
      font-size: 12px;
      font-weight: 700;
    }
  }
  .right {
    cursor: pointer;
    font-size: 12px;
    font-family: 'cute';
  }
}
/deep/ .messageTitle {
  font-family: 'cute';
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
  // font-family: 'cute';
}
</style>
