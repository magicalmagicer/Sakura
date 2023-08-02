<template>
  <div class="footer">
    <span class="scroll"></span>
    <el-divider></el-divider>
    <p class="copyright">Copyright <a target="_blank" href="https://www.miaomiaomiao.link"> &nbsp;水煮今生&nbsp;</a> <a target="_blank" href="https://beian.miit.gov.cn/">赣ICP备2023000562号</a></p>
  </div>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
a {
  color: #ffffff;
  text-align: center;
  text-decoration: none;
}
.footer {
  font-family: Microsoft YaHei;
  height: 70px;
  text-align: center;
  font-size: 16px;
  padding: 0px 100px;
  margin-top: 150px;
  position: relative;
  bottom: 0;
  // color: #000;
}
.footer {
  cursor: pointer;
}
.copyright {
  color: #fff;
  // font-size: 12px;
}
.info {
  font-size: 14px;
  color: #72767b;
  line-height: 25px;
}
.footer .scroll {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #eaeaea;
  /* background-color: rgba(216, 16, 109,0.6); */
  position: absolute;
  left: 5%;
  top: -25px;
  z-index: 10;
  animation: scrollA infinite 20s linear alternate;
}
@keyframes scrollA {
  0% {
    left: 5%;
    transform: rotate(180deg);
  }
  10% {
    left: 5%;
    transform: rotate(270deg);
  }
  20% {
    left: 5%;
    transform: rotate(450deg);
  }
  25% {
    left: 10%;
    transform: rotate(540deg);
  }
  30% {
    left: 20%;
    transform: rotate(720deg);
  }
  35% {
    left: 30%;
    transform: rotate(900deg);
  }
  40% {
    left: 40%;
    transform: rotate(1080deg);
  }
  45% {
    left: 50%;
    transform: rotate(1260deg);
  }
  50% {
    left: 60%;
    transform: rotate(1440deg);
  }
  55% {
    left: 70%;
    transform: rotate(1620deg);
  }
  60% {
    left: 80%;
    transform: rotate(1800deg);
  }
  80% {
    left: 90%;
    transform: rotate(2610deg);
  }
  90% {
    left: 90%;
    transform: rotate(2340deg);
  }
  100% {
    left: 90%;
    transform: rotate(2520deg);
  }
}
</style>
