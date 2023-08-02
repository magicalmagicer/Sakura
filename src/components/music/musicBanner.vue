<template>
  <el-carousel :interval="3000" type="card" height="200px" autoplay loop>
    <el-carousel-item v-for="(item, index) in rotationList" :key="index">
      <!-- <h3 class="medium">{{ item }}</h3> -->
      <!-- <img :src="item.imageUrl" alt="" /> -->
      <el-image style="width: 400px; height: 200px" :src="item.imageUrl" fit="fill"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      rotationList: []
    }
  },
  created() {
    this.getRotationList()
  },
  methods: {
    async getRotationList() {
      const { data: res } = await this.$http.get(this.$originUrl2 + '/banner')
      if (res.code == 200) {
        // console.log(res)
        this.rotationList = res.banners
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
