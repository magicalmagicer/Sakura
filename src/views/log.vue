<template>
  <div id="log">
    <div class="loginbg">
      <img :src="imgUrl" ref="img" />
    </div>
    <div class="block" v-if="$store.state.isSignIn == 0">
      <h3>{{ login_title }}</h3>
      <!-- 登录表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="right" @keyup.enter.native="submitForm">
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input prefix-icon="el-icon-user-solid" v-model.trim()="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label-width="80px" label="昵称" prop="nickname" v-if="status == 2">
          <el-input prefix-icon="el-icon-user-solid" v-model.string()="ruleForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock" ref="password"></el-input>
        </el-form-item>
        <el-form-item label-width="80px" label="确认密码" prop="checkPass" v-if="status == 2">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item style="margin-right: 100px; margin-top: 30px">
          <!-- <el-button type="primary" @click="submitForm()" v-if="status == 1 || 3">登录</el-button>
          <el-button type="primary" @click="register()" v-if="status == 2">注册</el-button>
          <el-button @click="resetForm('ruleForm')" v-if="status == 1 || 3">重置</el-button>
          <el-button @click="resetForm('ruleForm')" v-if="status == 2">重置</el-button> -->
          <el-button type="primary" @click="submitForm()" v-if="status !== 2">登录</el-button>
          <el-button type="primary" @click="register()" v-if="status == 2">注册</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <span class="tip" v-if="status == 1">没有注册？去<span class="sign" @click="toSign">注册</span></span>
      <span class="tip sign" style="color: #409eff; padding-left: 20px" v-if="status == 1" @click="toAdmin">管理员登录</span>
      <span class="tip" v-if="status == 2">已有账号？去<span class="sign" @click="toLogin">登录</span></span>
      <span class="tip sign white" v-if="status == 3" @click="toLogin">返回</span>
    </div>
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
      imgUrl: require('../assets/1.jpg'),
      imageUrl: '',
      nickname: '',
      status: 1,
      // 用户数据表
      ruleForm: {
        username: '',
        nickname: '',
        password: '',
        checkPass: ''
      },
      // 注册
      // reRules: {
      //   username: [
      //     { required: true, message: '请输入用户名', trigger: 'blur' },
      //     { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
      //   ],
      //   pass: [{ validator: validatePass, trigger: 'blur' }],
      // checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      // id: [{ validator: checkId, trigger: "blur" }],
      // },
      // 登录
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
      }
    }
  },
  methods: {
    // 定时器轮播背景图
    setTimer() {
      // clearInterval(this.timer)
      this.timer = setInterval(() => {
        // this.$nextTick(() => {
        // this.$refs.img.style.opacity = 1
        this.img_index = this.img_index < 3 ? this.img_index + 1 : 1
        this.imgUrl = require(`../assets/${this.img_index}.jpg`)
        setTimeout(() => {
          // this.$refs.img.style.opacity = 0.8
        }, 4000)
        // })
      }, 5000)
    },

    // 跳转到注册
    toSign() {
      this.status = 2
    },
    // 跳转到登录
    toLogin() {
      this.status = 1
    },
    // 跳转到管理员登录页面
    toAdmin() {
      this.status = 3
    },

    // 提交登录
    submitForm() {
      if (this.$refs.password.value.trim() == '') {
        this.$refs.password.focus()
      } else {
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
                  this.$router.push({ name: 'Index' })
                }, 1000)
              } else if (this.status === 3) {
                // 管理员登陆
                console.log('管理员登陆');
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

    // 提交注册
    register() {
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
          this.status = 1
          this.$message.success('用户注册成功！')
        } else {
          this.$message.error('用户名或者密码不合法！')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    async update() {
      await this.$http.post(this.$originUrl + '/api/users/updateUser', {
        nickname: this.nickname,
        head_img: this.imageUrl
      })
      // 刷新页面
      location.reload()
    }
  },
  created() {
    this.$store.commit('changIsSignIn', 0)
    // console.log(this.$store.state.isSignIn)
    // if (this.$store.state.isSignIn == 1) this.GetInfo()
  },
  mounted() {
    this.setTimer()
  },
  // updated() {
  //   this.setTimer()
  // },
  computed: {
    login_title: function () {
      return this.status === 1 ? '用户登录' : this.status === 2 ? '用户注册' : '管理员登录'
    }
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
  // margin-bottom: 30px;
  .block {
    // background-color: white;
    // width: 500px;
    // margin: 0 auto;
    // padding: 30px;
    // border: 1px solid #dbdcdf;
    // border-radius: 10px;
    text-align: center;
    width: 500px;
    height: 300px;
    border: 1px solid #2b2b2b;
    border-radius: 6px;
    box-shadow: 0 0 20px 20px #00000030;
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
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          color: #2b2b2b;
          padding: 0;
        }
      }
    }
    .tip {
      color: #707070;
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
    // height: 100px;
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
      // margin-right: 15px;
      border-radius: 100%;
    }
    p {
      color: #707070;
      text-align: center;
      font-size: 16px;
      // padding-bottom: 20px;
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
