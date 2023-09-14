<template>
  <div id="log">
    <div class="loginbg">
      <img :src="imgUrl" ref="img" />
    </div>
    <LoginBox @changeLoginStatus="changeLoginStatus" v-if="status === 1"></LoginBox>
    <RegisterBox @changeLoginStatus="changeLoginStatus" v-if="status === 2"></RegisterBox>
    <AdminLoignBox @changeLoginStatus="changeLoginStatus" v-if="status === 3"></AdminLoignBox>
  </div>
</template>
<script>
import LoginBox from '@/components/register-login-component/login.vue'
import AdminLoignBox from '@/components/register-login-component/admin-login.vue'
import RegisterBox from '@/components/register-login-component/register.vue'

export default {
  components: { LoginBox, AdminLoignBox, RegisterBox },
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
      status: 1,
      // 用户数据表
      ruleForm: {
        username: '',
        nickname: '',
        password: '',
        checkPass: ''
      },
      // 注册
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
      this.timer = setInterval(() => {
        this.img_index = this.img_index < 3 ? this.img_index + 1 : 1
        this.imgUrl = require(`@/assets/${this.img_index}.jpg`)
        setTimeout(() => {
          // this.$refs.img.style.opacity = 0.8
        }, 4000)
      }, 5000)
    },

    changeLoginStatus(status) {
      this.status = status
    }
  },
  created() {
  },
  mounted() {
    this.setTimer()
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
}
</style>
