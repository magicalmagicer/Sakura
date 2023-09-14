<template>
  <div class="block">
    <h3>用户注册</h3>
    <!-- 注册表单 -->
    <el-form :model="userinfo" status-icon :rules="rules" ref="userinfo" label-width="100px" class="demo-userinfo" label-position="right">
      <el-form-item label="用户名" prop="username" label-width="80px">
        <el-input prefix-icon="el-icon-user-solid" v-model.trim()="userinfo.username"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="昵称" prop="nickname">
        <el-input prefix-icon="el-icon-user-solid" v-model.string()="userinfo.nickname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="80px">
        <el-input type="password" v-model="userinfo.password" prefix-icon="el-icon-lock" ref="password"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="确认密码" prop="checkPass">
        <el-input type="password" v-model="userinfo.checkPass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <!-- 邮箱验证 -->
      <el-form-item label="邮箱" prop="email" label-width="80px">
        <el-input type="email" v-model="userinfo.email" prefix-icon="el-icon-message"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="验证码" prop="code" class="code">
        <el-input v-model="userinfo.code" autocomplete="off" suffix="获取验证码"></el-input>
        <el-button class="get-code" :type="disabled ? 'info' : 'success'" size="mini" :disabled="disabled" @click="getCode">{{
          disabled ? '已发送 ' + countdown : '获取验证码'
        }}</el-button>
      </el-form-item>

      <el-form-item style="margin-right: 100px; margin-top: 30px">
        <el-button type="primary" @click="register()">注册</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <span class="tip">已有账号？去<span class="sign" @click="toLogin">登录</span></span>
  </div>
</template>
<script>

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userinfo.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      //验证邮箱
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '' || !regEmail.test(value)) {
        callback(new Error('请输入有效的邮箱'));
      } else {
        callback();
      }
    };
    return {
      name: '',
      // 背景定时切换
      img_index: 1,
      timer: null,
      imgUrl: require('@/assets/1.jpg'),
      imageUrl: '',
      nickname: '',
      countdown: 10,
      // 用户数据表
      userinfo: {
        username: '',
        nickname: '',
        password: '',
        checkPass: '',
        email: '',
        code: '',
      },
      disabled: false,
      timer: null,
      // 注册
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' },
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    // 跳转到登录
    toLogin() {
      this.$emit('changeLoginStatus', 1);
    },

    // 提交注册
    register() {
      this.$refs.userinfo.validate(async (valid) => {
        if (valid) {
          let data = this.$qs.stringify({
            username: this.userinfo.username,
            password: this.userinfo.password,
            nickname: this.userinfo.nickname,
            email: this.userinfo.email,
            code: this.userinfo.code,
          });
          const { data: res } = await this.$http.post(this.$originUrl + '/api/users/register', data);
          if (res.status === 1) {
            return this.$message.error(res.message);
          }
          this.status = 1;
          this.$message.success('用户注册成功！');
          this.toLogin();
        } else {
          this.$message.error('用户名或者密码不合法！');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.userinfo.resetFields();
    },
    countDown() {
      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.timer);
          this.disabled = false;
        }
      }, 1000);
    },
    //获取验证码
    getCode() {
      this.$refs.userinfo.validateField('email', async (valid) => {
        if (valid === '') {
          let data = this.$qs.stringify({
            email: this.userinfo.email,
            type: 1,
          });
          console.log(data);
          const { data: res } = await this.$http.post(this.$originUrl + '/api/users/getcode', data);
          if (res.status === 1) {
            return this.$message.error('验证码获取失败,请重试！');
          }
          this.$message.success('验证码发送成功！');
          this.disabled = true;
          this.countDown();
        } else {
          return this.$message.error('邮箱格式错误！');
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  text-align: center;
  width: 500px;
  height: 500px;
  border: 1px solid rgba(172, 172, 255, .8);
  border-radius: 6px;
  box-shadow: 0 0 20px 20px rgba(142, 132, 132, 0.2);
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  /deep/ .el-form-item__label {
    color: #ffffff;
    font-size: 16px;
  }
  h3 {
    color: #fff;
    font-family: 'Arial';
  }
  .sign {
    cursor: pointer;
  }
  .code {
    position: relative;
    .get-code {
      position: absolute;
      right: 8px;
      top: 48%;
      transform: translateY(-50%);
    }
    /deep/ .el-button--mini {
      width: 72px;
      padding: 7px 5px;
    }
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
// }
</style>
