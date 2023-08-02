<template>
  <div class="block">
    <h3>用户登录</h3>
    <!-- 登录表单 -->
    <el-form :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" label-position="right" @keyup.enter.native="submitForm">
      <el-form-item label="用户名" prop="username" label-width="80px">
        <!-- <el-input :value="ruleForm.username" prefix-icon="el-icon-user-solid" @input="changeUsername"></el-input> -->
        <el-input prefix-icon="el-icon-user-solid" v-model.trim()="ruleForm.username" @input="changeUsername"></el-input>
        <!-- <input type="text" :value="ruleForm.username" οnkeyup="value=value.replace(/[^\w\.\/]/ig,'')" /> -->
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="80px">
        <el-input type="password" prefix-icon="el-icon-lock" ref="password" @input="changePassword($event)" :value="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item style="margin-right: 100px; margin-top: 30px">
        <el-button type="primary" @click="submitForm()">登录</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <span class="tip">没有注册？去<span class="sign" @click="toSign">注册</span></span>
    <span class="tip sign" style="color: #409eff; padding-left: 20px" @click="toAdmin">管理员登录</span>
  </div>
</template>
<script>
import Cookie from 'js-cookie'

export default {
  filters: {
    name(str) {
      if (str) return str.substring(0, 1)
      else return ''
    }
  },
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
      name: '',
      // 背景定时切换
      img_index: 1,
      timer: null,
      imgUrl: require('@/assets/1.jpg'),
      imageUrl: '',
      nickname: '',
      // 用户数据表
      ruleForm: {
        username: '',
        password: ''
      },
      // 登录
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交登录
    submitForm() {
      if (this.$refs.password.value.trim() == '') {
        console.log('111111111')
        this.$refs.password.focus()
      } else {
        console.log('222')
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            let data = this.$qs.stringify({
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })

            let res = await this.$http.post(this.$originUrl + '/api/users/login', data)
            if (res.data.status === 1) {
              return this.$message.error(res.data.message)
            } else {
              // 修改vuex的登录状态
              this.$store.commit('changIsSignIn', 1)
              // 设置cookie
              Cookie.set('token', res.data.token)
              Cookie.set('username', this.ruleForm.username)
              Cookie.set('user_id', res.data.id)
              Cookie.set('user_power', res.data.power)

              // 修改vuex的token
              this.$store.commit('setToken', res.data.token)
              this.$store.commit('setUsername', res.data.username)
              this.$store.commit('setId', res.data.id)
              if (res.data.nickname) {
                this.name = res.data.nickname
              } else {
                this.name = res.data.username
              }
              // 普通登录
              if (this.status === 1) {
                this.$message.success(`登录成功，${this.name} 欢迎你！`)
                setTimeout(() => {
                  this.$router.push({ path: '/home' })
                }, 1000)
              } else if (this.status === 3) {
                // 管理员登陆
                console.log('管理员登陆')
                if (res.data.power >= 2) {
                  this.$message.success(`登录后台管理系统成功，${this.name} 欢迎你！`)
                  setTimeout(() => {
                    this.$router.push('/backstage')
                  }, 1000)
                } else {
                  return this.$message.warning('您不是管理员，无法登录！')
                }
              }
            }
          } else {
            this.$message.error('用户名或者密码不合法！')
            return false
          }
        })
      }
    },
    resetForm() {
      // this.$refs.ruleForm.resetFields()
    },
    changeUsername(e) {
      // this.$set(this.ruleForm, 'username', e)
      // console.log(e)
      // this.ruleForm.username = e
      // console.log(this.ruleForm.username)
      this.$forceUpdate()
    },
    changePassword(e) {
      this.ruleForm.password = e
    }
  },
  created() {
    // this.$store.commit('changIsSignIn', 0)
  }
}
</script>

<style lang="less">
#log {
  margin: auto;
  .loginbg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    img {
      width: 100%;
      height: 100%;
      transition: 1.5s all;
    }
  }
  .white {
    color: #fff !important;
  }
  .block {
    text-align: center;
    width: 500px;
    height: 300px;
    border: 1px solid #877b7b;
    border-radius: 6px;
    box-shadow: 0 0 20px 20px rgba(142, 132, 132, 0.2);
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto auto;

    h3 {
      color: #fff;
      font-family: 'Arial';
    }
    .sign {
      cursor: pointer;
    }
    .el-form {
      width: 350px;
      margin: auto;
      .el-form-item {
        .el-form-item__label {
          color: #fff;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          padding: 0;
        }
      }
    }
    .tip {
      color: #fff;
      font-size: 14px;
      span {
        color: #409eff;
      }
    }
  }
  .isSignIn {
    border: 1px solid #ebeef5;
    padding: 30px;
    margin: 30px auto;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.7);
    .avatar {
      width: 100px;
      height: 100px;
      line-height: 40px;
      border-radius: 100%;
    }
    p {
      color: #707070;
      text-align: center;
      font-size: 16px;
    }
  }
  .isSignIn ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(20px);
    z-index: -1;
    margin: -30px;
  }
  .btn {
    display: flex;
  }
}
</style>
