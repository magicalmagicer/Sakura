<template>
  <div class="category">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="danger" size="small" class="add" @click="showAdd">新增分类 +</el-button>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 文章分类 -->
      <el-table :data="tagList" border stripe>
        <el-table-column type="index" label="#" :index="count" align="center" width="80px"></el-table-column>
        <el-table-column label="分类名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEdit(scope.row)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeTag(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改分类标签 -->
    <el-dialog title="修改文章分类" :visible.sync="dialogVisible" width="30%">
      <span>原名称：{{oldName}}</span>
      <el-input v-model="newName" placeholder="请输入修改后的名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTag">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增分类标签 -->
    <el-dialog title="新增文章分类" :visible.sync="newTagVisible" width="30%">
      <el-input v-model="newTag" placeholder="请输入新增分类名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newTagVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'Status',
  data() {
    return {
      tagList: [],
      // edit
      dialogVisible: false,
      newName: '',
      oldName: '',
      selectedId: 0,
      newTag: '',
      newTagVisible: false
    }
  },
  created() {
    this.GetAllArticleClassName()
  },
  methods: {
    // 获取全部文章标签
    async GetAllArticleClassName() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/cates')
      this.tagList = res.data
      // console.log(this.tagList);
    },
    showEdit(row) {
      this.selectedId = row.id
      this.oldName = row.name
      this.dialogVisible = true
    },
    async editTag() {
      if (!this.newName.trim()) return this.$message.warning('请输入修改内容！')
      if (this.newName.trim() == this.oldName.trim()) return this.$message.warning('新名称不得与原名称相同！')
      let data = this.$qs.stringify({
        id: this.selectedId,
        name: this.newName.trim(),
        operation: 'edit'
      })
      let { data: res } = await this.$http.post(this.$originUrl + '/admin/category', data)
      this.dialogVisible = false
      this.newName = ''
      if (res.status !== 0) return this.$message.warning('修改分类名称失败！')
      this.$message.success('修改分类名称成功！')
      this.GetAllArticleClassName()

    },
    removeTag(id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let data = this.$qs.stringify({
          id: id,
          operation: 'delete'
        })
        let { data: res } = await this.$http.post(this.$originUrl + '/admin/category', data)
        if (res.status !== 0) return this.$message.warning('删除失败！')
        this.$message({ type: 'success', message: '删除成功!' })
        this.GetAllArticleClassName()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      console.log(id);
    },
    showAdd() {
      this.newTagVisible = true
    },
    async addTag() {
      if (!this.newTag.trim()) return this.$message.warning('请输入新增分类名称！')
      let data = this.$qs.stringify({
        name: this.newTag.trim(),
        operation: 'add'
      })
      let { data: res } = await this.$http.post(this.$originUrl + '/admin/category', data)
      this.newTagVisible = false
      this.newTag = ''
      if (res.status !== 0) return this.$message.warning('新增分类名称失败！')
      this.$message.success('新增分类名称成功！')
      this.GetAllArticleClassName()
    }
  }
}
</script>
<style lang="less" scoped>
.category {
  position: relative;
  /deep/ .el-breadcrumb {
    margin-bottom: 10px;
  }
  .box-card {
    /deep/ .el-row {
      margin-bottom: 15px;
    }
  }
  /deep/ .el-table__row {
    height: 50px;
    overflow: hidden;
  }
  .add {
    position: absolute;
    right: 60px;
    top: -15px;
    font-size: 14px;
  }
}
</style>
