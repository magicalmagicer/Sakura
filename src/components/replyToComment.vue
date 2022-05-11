<template>
  <div>
    <!-- 回复评论 -->
    <div class="box-card">
      <div slot="header" class="clearfix">
        <span>回复我的</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped></style>
