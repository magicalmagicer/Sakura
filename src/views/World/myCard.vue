<template>
  <div class="father">
    <!-- 个人资料修改 -->
    <h1 class="information label" v-if="editInformation">个人资料</h1>
    <span class="label toEditSecret" @click="changeState" v-if="editInformation">修改密码?</span>
    <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="100px" class="demo-ruleForm" v-if="editInformation">
      <el-form-item prop="username">
        <span slot="label">
          <span class="label">用户名</span>
        </span>
        <el-input v-model="userInfoForm.username" class="ipt"></el-input>
      </el-form-item>

      <!-- <el-form-item label="密码" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item> -->
      <el-form-item prop="nickname">
        <span slot="label">
          <span class="label">昵称</span>
        </span>
        <el-input v-model="userInfoForm.nickname" class="ipt"></el-input>
      </el-form-item>

      <el-form-item prop="avatar">
        <span slot="label">
          <span class="label">头像</span>
        </span>
        <el-upload class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload" action="http://127.0.0.1:3007/avatar">
          <el-image v-if="imgUrl" :src="imgUrl" class="avatar" fit="contain" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <button class="button" @click="saveUserInfo" v-if="editInformation">保存修改</button>

    <!-- 密码修改 -->
    <h1 class="information label" v-if="!editInformation">密码修改</h1>
    <span class="label toEditSecret" @click="changeState" v-if="!editInformation">不想改了？</span>
    <el-form :model="secretForm" :rules="secretRules" ref="secretForm" label-width="100px" class="demo-ruleForm height" v-if="!editInformation">
      <el-form-item prop="originSecret">
        <span slot="label">
          <span class="label">原密码</span>
        </span>
        <el-input v-model="secretForm.originSecret" class="ipt" show-password></el-input>
      </el-form-item>
      <el-form-item prop="newSecret">
        <span slot="label">
          <span class="label">新密码</span>
        </span>
        <el-input v-model="secretForm.newSecret" class="ipt"></el-input>
      </el-form-item>
      <el-form-item prop="again">
        <span slot="label">
          <span class="label">确认新密码</span>
        </span>
        <el-input v-model="secretForm.again" class="ipt"></el-input>
      </el-form-item>
    </el-form>
    <button class="button" @click="saveSecret" v-if="!editInformation">修改密码</button>
  </div>
  <!-- <slot slot-scope="ttt">{{ ttt }}</slot> -->
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '' || value.length < 5 || value.length > 15) {
        callback(new Error('请输入长度在 5 到 15 个字符的原密码！'))
      } else if (value !== this.secretForm.newSecret) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass1 = (rule, value, callback) => {
      if (value === '' || value.length < 5 || value.length > 15) {
        callback(new Error('请输入长度在 5 到 15 个字符的密码！'))
      } else if (value == this.secretForm.originSecret) {
        callback(new Error('新密码不能和原密码相同！!'))
      } else {
        callback()
      }
    }

    return {
      changeAvatar: false,
      secretForm: {
        originSecret: '',
        newSecret: '',
        again: ''
      },

      rules: {},
      editInformation: true,
      // 用户数据表单
      userInfoForm: {
        username: '',
        nickname: '',
        avatar: ''
      },
      originForm: {},
      // id: 0,
      imgUrl: '',
      originImgUrl: '',
      secretRules: {
        originSecret: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        newSecret: [{ validator: validatePass1, trigger: 'blur' }],
        again: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    changeState() {
      this.editInformation = !this.editInformation
    },
    //保存密码
    saveSecret() {
      this.$refs.secretForm.validate(async valid => {
        if (valid) {
          const params = this.$qs.stringify({
            oldPwd: this.secretForm.originSecret,
            newPwd: this.secretForm.newSecret,
            id: Cookie.get('user_id')
          })
          const { data: res } = await this.$http.post(this.$originUrl + '/my/updatepwd', params)
          // console.log(res)
        } else {
          return this.$message.warning('输入格式有误！')
        }
      })
    },
    // 保存用户信息
    async saveUserInfo() {
      if (JSON.stringify(this.originForm) !== JSON.stringify(this.userInfoForm) || this.changeAvatar) {
        const params = new FormData()
        if (this.userInfoForm.avatar !== this.originImgUrl) {
          params.append('file', this.userInfoForm.avatar)
          // console.log(this.originImgUrl)
          if (this.originImgUrl !== null) {
            // console.log(1)
            params.append('oldavatar', this.originImgUrl.split('avatar/')[1])
          }
        }
        // 依次将文章相关信息添加到params表单中
        // console.log(this.userInfoForm.username)
        params.append('username', this.userInfoForm.username)
        params.append('nickname', this.userInfoForm.nickname)
        // console.log(params)
        const { data: res } = await this.$http.post(this.$originUrl + '/my/userinfo', params)
        if (res.status !== 0) return this.$message.warning('修改用户信息失败！')
        this.$message.success('修改用户信息成功！')
        this.getUserInfo()
      } else {
        // console.log(this.userInfoForm)
        return this.$message.info('未对个人信息进行修改！')
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http.get(this.$originUrl + '/my/userinfo', { params: { id: Cookie.get('user_id') } })
      if (res.status !== 0) return this.$message.warning('获取用户信息失败！')
      this.userInfoForm = res.data
      // this.originForm = res.data
      this.originForm = JSON.parse(JSON.stringify(this.userInfoForm))
      // console.log(this.userInfoForm)
      this.originImgUrl = this.userInfoForm.avatar
      // console.log(this.originImgUrl)
      this.imgUrl = this.userInfoForm.avatar
      // console.log(res)
    },
    // 图片上传前处理函数
    beforeAvatarUpload(file) {
      let imgType = file.type.toLowerCase()
      let limitType = ['image/jpeg', 'image/png', 'image/jpg']
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!limitType.includes(imgType)) {
        return this.$message.error('请检查上传头像图片格式!')
      }
      if (!isLt2M) {
        return this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 预览图地址
      this.imgUrl = URL.createObjectURL(file)
      // console.log(this.imgUrl)
      // 图片信息
      this.userInfoForm.avatar = file
      // 添加头像修改判断
      this.changeAvatar = true
      // // 如果要阻止默认的发送行为，就返回 false
      // console.log(1)
      return false
    }
  }
}
</script>
<style lang="less" scoped>
.height {
  margin: 39px 0;
}
.father {
  position: relative;
}
.toEditSecret {
  z-index: 3;
  top: 50px;
  right: 70px;
  font-size: 14px;
  position: absolute;
  cursor: pointer;
}
.information {
  display: block;
  width: 100px;
  font-size: 20px;
  margin: 25px auto;
}
.label {
  color: #fff;
}
.ipt {
  display: inline-block;
  width: 250px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.button {
  display: block;
  border: 0;
  border-radius: 5px;
  background-color: #409eff;
  width: 80px;
  height: 40px;
  margin: auto;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
}
.avatar-uploader-icon {
  border: 1px dashed #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
