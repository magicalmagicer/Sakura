<template>
  <div>
    <h1 class="title">我的文章</h1>
    <!-- 文章列表 -->
    <el-table :data="myArticle" stripenpm style="width: 100%">
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 50px" :src="scope.row.pic_url"></el-image>
          <!-- <el-image style="width: 100px; height: 50px" src="./no-cover.gif"></el-image> -->
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="create_time" label="发布时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editArticle(scope.row.id)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeArticle(scope.row.id)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[3, 5, 10, 20]" :page-size="pageSize" layout="prev, pager, next, jumper, sizes" :total="total" class="top"> </el-pagination>
    <!-- </el-card> -->
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      // 文章总数
      total: 0,
      // 文章列表
      myArticle: []
      // replace: {}
    }
  },
  created() {
    this.GetAllArticle()
  },
  methods: {
    // 删除文章
    removeArticle(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 确认删除
          // console.log('删除成功');
          const { data: res } = await this.$http.get(this.$originUrl + '/article/delete', { params: { id: id } })
          // console.log(res.data);
          if (res.status !== 0) return this.$message.waring('删除文章失败！')
          this.$message.success('删除文章成功！')
          this.GetAllArticle()
          // location.reload()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑文章
    editArticle(id) {
      this.$router.push(`/detail/${id}`)
    },
    // 获取个人文章
    async GetAllArticle() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/get', { params: { curPage: this.currentPage, pageSize: this.pageSize, id: Cookie.get('user_id') } })
      if (res.status === 1) {
        this.$message.error('获取文章列表失败！')
        if (res.message === '身份认证失败！') this.$router.push('/login')
        return
      }
      this.myArticle = res.data
      // 截取时间
      this.myArticle.map(item => {
        item.create_time = item.time.slice(0, 10)
      })

      // console.log(this.myArticle)
      this.total = res.count

      // this.GetAllArticleClassName()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.GetAllArticle()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.GetAllArticle()
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  display: flex;
  margin-top: 20px;
  // align-items: center;
  justify-content: center;
  // margin: 20px auto;
  // margin: auto;
  // margin-top: 20px;
  // margin-left: 50px;
}
.title {
  display: block;
  width: 100px;
  font-size: 20px;
  margin: 25px auto;
}
</style>
