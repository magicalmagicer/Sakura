<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户表格 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#" :index="count"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="昵称" prop="nickname"></el-table-column>
        <!-- <el-table-column label="电话" prop="mobile"></el-table-column> -->
        <el-table-column label="权限">
          <template slot-scope="scope">
            <span>{{ location[scope.row.power] }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"> </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
            <!-- 分配 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
            <!-- 重置密码 -->
            <el-tooltip effect="dark" content="重置密码" placement="top" :enterable="false">
              <el-button type="success" size="mini" icon="el-icon-refresh-left" @click="resetPassword(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="新用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="right">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input prefix-icon="el-icon-user-solid" v-model.trim()="ruleForm.username"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label-width="80px" label="昵称" prop="nickname">
          <el-input prefix-icon="el-icon-info" v-model.string()="ruleForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock" ref="password"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label-width="80px" label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="userInfoForm" :rules="rules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="username">
          <span slot="label">
            <span class="label">用户名</span>
          </span>
          <el-input v-model="userInfoForm.username" class="ipt"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <span slot="label">
            <span class="label">昵称</span>
          </span>
          <el-input v-model="userInfoForm.nickname" class="ipt"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed" ref="setRoleFormRef">
      <div>
        <p>当前用户:{{ userInfo.username }}</p>
        <p>当前角色:{{ location[userInfo.power] }}</p>
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Users',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      selectedRoleId: '',
      location: { 0: '普通用户', 1: '高级用户', 2: '管理员', 3: '超级管理员' },
      roleList: [
        { id: 2, roleName: '管理员' },
        { id: 1, roleName: '高级用户' },
        { id: 0, roleName: '普通用户' }
      ],
      // 注册验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      userInfo: {},
      // 用户数据表
      ruleForm: {
        username: '',
        nickname: '',
        password: '',
        checkPass: ''
      },
      // 单个用户数据表单
      userInfoForm: {
        username: '',
        nickname: ''
      },
      setRoleDialogVisible: false,
      editForm: {},
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userlist: [],
      total: 0,
      // 控制添加用户的对话框的显示和隐藏
      addDialogVisible: false,
      // 控制修改用户信息的对话框的显示和隐藏
      editDialogVisible: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    count(index) {
      return (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize + index + 1
    },
    // 重置密码
    resetPassword(row) {
      this.$confirm('此操作将重置改用户密码，原密码将不再可用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.post(this.$originUrl + '/admin/reset', this.$qs.stringify({ role_power: row.power, power: Cookie.get('user_power'), id: row.id }))
          if (res.status !== 0) return this.$message.error('重置密码失败！')
          this.$message.success('重置密码成功！')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置操作！'
          })
        })
    },
    // 点击按钮分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId || this.selectedRoleId === this.userInfo.power) return this.$message.warning('请选择要分配的新权限！')
      const { data: res } = await this.$http.post(this.$originUrl + '/admin/rights', this.$qs.stringify({ role_power: this.selectedRoleId, power: Cookie.get('user_power'), id: this.userInfo.id }))
      // const { data: res } = await this.$http.post(`users/${this.userInfo.id}/role`, { rid: this.selectedRoleId })
      if (res.status !== 0) return this.$message.error('当前权限不足，无法进行此操作！')
      this.$message.success('设置权限成功！')
      this.getUserList()
      this.setRoleDialogVisible = false
    },
    // 显示分配角色界面
    async setRole(userInfo) {
      this.userInfo = userInfo
      // console.log(userInfo)
      this.setRoleDialogVisible = true
    },
    // 删除用户
    async removeUserById(id) {
      const confirmResult = await this.$confirm('此操作将永久该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.post(this.$originUrl + '/admin/deleteuser', this.$qs.stringify({ id, power: Cookie.get('user_power') }))
      if (res.status !== 0) return this.$message.warning('你没有权限删除此用户！')
      this.$message.success('删除用户成功')
      this.getUserList()
    },
    // 修改用户信息
    async editUserInfo() {
      const params = new FormData()
      // 依次将文章相关信息添加到params表单中
      params.append('username', this.userInfoForm.username)
      params.append('nickname', this.userInfoForm.nickname)
      const { data: res } = await this.$http.post(this.$originUrl + '/my/userinfo', params)
      if (res.status !== 0) return this.$message.warning('修改用户信息失败！')

      this.editDialogVisible = false
      this.getUserList()
      this.$message.success('修改用户信息成功！')
    },
    // 根据用户id查询对应用户信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get(this.$originUrl + '/my/userinfo', { params: { id: id } })
      if (res.status !== 0) return this.$message.warning('获取用户信息失败！')
      // console.log(res.data.nickname)
      this.userInfoForm.nickname = res.data.nickname
      this.userInfoForm.username = res.data.username
      // console.log(this.userInfoForm)
      this.editDialogVisible = true
    },
    // 点击按钮添加新用户
    addUser() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let data = this.$qs.stringify({
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            nickname: this.ruleForm.nickname
          })
          const { data: res } = await this.$http.post(this.$originUrl + '/api/users/register', data)
          if (res.status === 1) {
            return this.$message.error('用户注册失败,请重试！')
          }
          this.$message.success('用户注册成功！')
          this.addDialogVisible = false
          this.getUserList()
        } else {
          this.$message.error('用户名或者密码不合法！')
          return false
        }
      })
    },
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get(this.$originUrl + '/admin/users', { params: this.queryInfo })

      if (res.status !== 0) return this.$message.warning('获取用户列表失败！')
      this.userlist = res.data
      this.total = res.count
    },
    // 监听pagesize变化
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getUserList()
    },
    // 监听当前页变化
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    addDialogClosed() {
      this.$refs.ruleFormRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    setRoleDialogClosed() {
      this.selectedRoleId = ''
      this.userinfo = {}
    }
    // 消息弹窗
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
</style>
