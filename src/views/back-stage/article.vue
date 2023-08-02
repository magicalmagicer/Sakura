<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getBookList">
            <el-button slot="append" icon="el-icon-search" @click="getBookList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 文章表格 -->
      <el-table :data="booklist" border stripe>
        <el-table-column type="index" label="#" :index="count"></el-table-column>
        <el-table-column label="标题" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="分类" prop="category" width="100px"></el-table-column>
        <el-table-column label="文章内容" prop="content" show-overflow-tooltip=""></el-table-column>
        <el-table-column label="作者" prop="nickname" width="130px"></el-table-column>
        <el-table-column label="发布时间" prop="create_time" width="100px"></el-table-column>
        <el-table-column label="操作" align="center" width="80px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button> -->
            <!-- 删除 -->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeArticle(scope.row.id)"></el-button>
            <!-- 分配 -->
            <!-- <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting" @click="setRole(scope.row)"></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Users',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      booklist: [],
      total: 0
    }
  },
  created() {
    this.getBookList()
  },
  methods: {
    count(index) {
      return (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize + index + 1
    },
    // 删除文章
    removeArticle(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 确认删除
          const { data: res } = await this.$http.get(this.$originUrl + '/article/delete', { params: { id: id } })
          if (res.status !== 0) return this.$message.waring('删除文章失败！')
          this.$message.success('删除文章成功！')
          this.getBookList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取文章列表
    async getBookList() {
      if (!this.queryInfo.query) {
        var { data: res } = await this.$http.get(this.$originUrl + '/article/get', { params: { curPage: this.queryInfo.pagenum, pageSize: this.queryInfo.pagesize } })
      } else {
        // 关键词搜索
        var { data: res } = await this.$http.get(this.$originUrl + '/article/search', {
          params: { key: this.queryInfo.query, curPage: this.queryInfo.pagenum, pageSize: this.queryInfo.pagesize }
        })
      }
      if (res.status !== 0) return this.$message.warning('获取文章列表失败！')
      this.booklist = res.data
      this.booklist.map(item => {
        item.create_time = item.time.slice(0, 10)
      })
      this.total = res.count
    },
    // 监听pagesize变化
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getBookList()
    },
    // 监听当前页变化
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getBookList()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-breadcrumb {
  margin-bottom: 10px;
}
.box-card {
  /deep/ .el-row {
    margin-bottom: 15px;
  }
}
/deep/ .el-table__row {
  max-height: 100px;
  height: 80px;
  overflow: hidden;
}
</style>
