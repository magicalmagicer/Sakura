<template>
  <div class="about wow slideInLeft">
    <div class="headerImg">
      <img src="../assets/about.jpg" alt="" />
    </div>
    <h1 class="aboutMe">About Me</h1>
    <el-divider><i class="el-icon-s-check"></i></el-divider>
    <div class="aboutItem">
      <div class="info">
        <h1>📝 个人信息</h1>
        <li class="name">愿风裁尘</li>
        <li>大三在读，现居甘肃</li>
        <li>在路上的前端学习者</li>
        <li>希望能和大家一同进步~</li>
      </div>
    </div>
  </div>
</template>

<script>
import WOW from 'wowjs'
export default {
  provide() {
    return {
      reload: this.reload
    }
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
  }
}
</script>

<style lang="less">
.about {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  width: 100%;
  color: rgb(127, 141, 153);
  .el-divider--horizontal {
    width: 80%;
  }
  .el-divider__text {
    background-color: rgba(248, 248, 248, 0.952);
  }
  .aboutMe {
    font-size: 42px;
    width: 300px;
    text-align: center;
    border-radius: 10px;
    line-height: 1.8;
    background: 0px 0px;
    border: 2px solid rgb(150, 150, 150);
    box-shadow: rgb(150 150 150) 0.4rem 0.4rem 0px 0px;
  }
  .headerImg {
    img {
      width: 700px;
      border-radius: 1rem;
    }
  }
  .aboutItem {
    display: flex;
    padding: 0;
    .info {
      display: flex;
      flex-direction: column;
    }
  }
  li {
    padding: 10px 0;
    font-size: 18px;
    color: #707070;
  }

  .comment {
    width: 700px;
  }
}
</style>
