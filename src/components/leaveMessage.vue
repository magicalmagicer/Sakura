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
    <div class="box-card">
      <!-- 具体内容 -->
      <div class="content text item">
        <div class="info">
          <div class="information">
            <div class="username">
              <!-- 评论者昵称 -->
              一颗星嘻嘻
              <!-- {{ item.nickname ? item.nickname : item.username }} -->
            </div>
            <div class="article">给你的文章 《 <span>蝶恋花</span> 》 留言:</div>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="detail">
          <div class="reply">
            写的不错！
          </div>
          <el-button style="float: right; padding: 3px 0" type="text">已阅</el-button>
        </div>
        <div class="footer">
          <!-- 时间 -->
          <div class="time">2021-06-03 10:54:02</div>
          <!-- <el-button type="text">文字按钮</el-button> -->
          <el-button type="text" class="el-icon-chat-round" :plain="true">回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.detail {
  padding: 10px;
}
.footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: #999;
  .time {
    margin-right: 10px;
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
  margin-bottom: 10px;
  .username {
    font-weight: 700;
    margin-right: 10px;
  }
  .article {
    font-size: 13px;
    color: #999;
    span {
      color: #666;
    }
  }
}
.clearfix {
  margin-bottom: 20px;
  font-size: 12px;
  // span {
  //   color: #666;
  //   font-size: 16px;
  // }
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
  // width: 480px;
  .content {
    padding: 10px 20px;
    background-color: #ffffc3;
    border-radius: 10px;
  }
}
/deep/ .messageTitle {
  font-family: 'cute';
  text-align: center;
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 5px;
  // font-family: 'cute';
}
</style>
