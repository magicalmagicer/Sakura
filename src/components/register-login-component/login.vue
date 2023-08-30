<template>
  <div class="block">
    <h3>用户登录</h3>
    <!-- 登录表单 -->
    <el-form :model="userinfo" ref="userinfo" status-icon :rules="rules" label-width="100px" class="demo-userinfo" label-position="right" @keyup.enter.native="submitForm">
      <el-form-item label="用户名" prop="username" label-width="80px">
        <el-input prefix-icon="el-icon-user-solid" v-model="userinfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="80px">
        <el-input type="password" prefix-icon="el-icon-lock" ref="password" v-model="userinfo.password"></el-input>
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
import Cookie from 'js-cookie';

export default {
  data() {
    return {
      // 用户数据表
      userinfo: {
        username: '',
        password: '',
      },
      // 登录
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // 提交登录
    submitForm() {
      if (this.$refs.password.value.trim() == '') {
        this.$refs.password.focus();
      } else {
        this.$refs.userinfo.validate(async (valid) => {
          if (valid) {
            let data = this.$qs.stringify({
              username: this.userinfo.username,
              password: this.userinfo.password,
            });

            let res = await this.$http.post(this.$originUrl + '/api/users/login', data);
            if (res.data.status === 1) {
              return this.$message.error(res.data.message);
            }
            // 修改vuex的登录状态
            this.$store.commit('changIsSignIn', 1);
            // 设置cookie
            Cookie.set('token', res.data.token);
            Cookie.set('username', this.userinfo.username);
            Cookie.set('user_id', res.data.id);
            Cookie.set('user_power', res.data.power);

            // 修改vuex的token
            this.$store.commit('setToken', res.data.token);
            this.$store.commit('setUsername', res.data.username);
            this.$store.commit('setId', res.data.id);
            this.name = res.data.nickname || res.data.username;

            setTimeout(() => {
              this.$router.push({ path: '/home' });
              // 普通登录
              this.$message.success(`登录成功，${this.name} 欢迎你！`);
            }, 1000);
          } else {
            this.$message.error('用户名或者密码不合法！');
            return false;
          }
        });
      }
    },
    resetForm() {
      this.$refs.userinfo.resetFields();
    },
    toSign() {
      this.$emit('changeLoginStatus', 2);
    },
    toAdmin() {
      this.$emit('changeLoginStatus', 3);
    },
  },
};
</script>

<style lang="less" scoped>
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
    border: 1px solid rgba(172, 172, 255, 0.8);
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
.demo-userinfo {
  /deep/ .el-form-item__label {
    color: #fff;
  }
}
</style>
