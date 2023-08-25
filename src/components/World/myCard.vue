<template>
  <div class="father">
    <!-- 个人资料修改 -->
    <h1 class="information label">个人资料</h1>
    <span class="label toEditSecret" @click="changeState">修改密码</span>
    <span class="label toChangeEmail" @click="changeEmail">邮箱换绑</span>
    <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="username">
        <span slot="label">
          <span class="label">用户名</span>
        </span>
        <el-input v-model="userInfoForm.username" class="ipt" disabled></el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <span slot="label">
          <span class="label">昵称</span>
        </span>
        <el-input v-model="userInfoForm.nickname" class="ipt"></el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <span slot="label">
          <span class="label">邮箱</span>
        </span>
        <el-input v-model="userInfoForm.email" class="ipt" disabled></el-input>
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
    <el-button class="saveBtn" @click="saveUserInfo" type="success" size="small">保存修改</el-button>

    <!-- 密码修改 -->
    <el-dialog title="修改密码" :visible.sync="passwordDialog" width="40%" :modal="false" style="margin-top: 60vh" :close-on-click-modal="false">
      <el-form :model="pwdForm" :rules="secretRules" ref="pwdForm" label-width="100px" class="demo-ruleForm height">
        <el-form-item label="邮箱" prop="">
          <el-input type="email" v-model="pwdForm.email" prefix-icon="el-icon-message" ref="password" disabled></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="code" label-position="left">
          <el-input v-model="pwdForm.code" autocomplete="off" suffix="获取验证码"></el-input>
          <el-button class="get-code" :type="disabled ? 'info' : 'success'" size="mini" :disabled="disabled" @click="getCode">{{
            disabled ? '已发送 ' + countdown : '获取验证码'
          }}</el-button>
        </el-form-item>
        <el-form-item prop="newSecret" label="新密码">
          <el-input v-model="pwdForm.newSecret" class="" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="again" label="确认新密码">
          <el-input v-model="pwdForm.again" class="" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <el-button class="button" @click="savePwd" type="danger" size="small">确认修改</el-button>
        <el-button class="button" @click="passwordDialog = false" type="info" size="small">放弃修改</el-button>
      </div>
    </el-dialog>

    <!-- 邮箱换绑 -->
    <el-dialog title="邮箱换绑" :visible.sync="emailDialog" width="40%" :modal="false" style="margin-top: 60vh" :close-on-click-modal="false">
      <el-form :model="emailForm" :rules="emailRules" ref="emailForm" label-width="100px" class="demo-ruleForm height">
        <!-- 旧邮箱 -->
        <el-form-item label="邮箱" prop="old_email">
          <el-input type="email" v-model="emailForm.old_email" prefix-icon="el-icon-message" disabled></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="old_code" class="code" label-position="left">
          <el-input v-model="emailForm.old_code" autocomplete="off" suffix="获取验证码" :disabled="!emailForm.old_email"></el-input>
          <el-button class="get-code" :type="disabled_old ? 'info' : 'success'" size="mini" :disabled="disabled_old || !emailForm.old_email" @click="getOldEmailCode">{{
            disabled_old ? '已发送 ' + countdown_old : '获取验证码'
          }}</el-button>
        </el-form-item>
        <!-- 新邮箱 -->
        <el-form-item label="邮箱" prop="new_email">
          <el-input type="email" v-model="emailForm.new_email" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="new_code" class="code" label-position="left">
          <el-input v-model="emailForm.new_code" autocomplete="off" suffix="获取验证码"></el-input>
          <el-button class="get-code" :type="disabled_new ? 'info' : 'success'" size="mini" :disabled="disabled_new" @click="getNewEmailCode">{{
            disabled_new ? '已发送 ' + countdown_new : '获取验证码'
          }}</el-button>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <el-button class="button" @click="saveEmail" type="danger" size="small">确认修改</el-button>
        <el-button class="button" @click="passwordDialog = false" type="info" size="small">放弃修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '' || value.length < 5 || value.length > 15) {
        callback(new Error('请输入长度在 5 到 15 个字符的原密码！'));
      } else if (value !== this.pwdForm.newSecret) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '' || value.length < 5 || value.length > 15) {
        callback(new Error('请输入长度在 5 到 15 个字符的密码！'));
      } else if (value == this.pwdForm.originSecret) {
        callback(new Error('新密码不能和原密码相同！!'));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      //验证邮箱
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '' || !regEmail.test(value) || value === this.emailForm.old_email) {
        callback(new Error('请输入有效的邮箱'));
      } else {
        callback();
      }
    };

    return {
      passwordDialog: false,
      changeAvatar: false,
      emailDialog: false,
      pwdForm: {
        email: '',
        code: '',
        newSecret: '',
        again: '',
      },
      // 邮箱换绑
      emailForm: {
        old_email: '',
        old_code: '',
        new_email: '',
        new_code: '',
      },

      rules: {},
      editInformation: true,
      // 用户数据表单
      userInfoForm: {
        username: '',
        nickname: '',
        avatar: '',
        email: '',
      },
      originForm: {},
      imgUrl: '',
      originImgUrl: '',
      secretRules: {
        code: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        newSecret: [{ validator: validatePass1, trigger: 'blur' }],
        again: [{ validator: validatePass2, trigger: 'blur' }],
      },
      emailRules: {
        old_code: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
        new_code: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
        old_email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        new_email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
      },
      disabled: false,
      disabled_new: false,
      disabled_old: false,

      timer: null,
      newTimer: null,
      oldTimer: null,
      countdown: 10,
      countdown_new: 10,
      countdown_old: 10,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    changeState() {
      this.pwdForm.email = this.userInfoForm.email;
      this.passwordDialog = true;
    },
    //保存密码
    savePwd() {
      this.$refs.pwdForm.validate(async (valid) => {
        if (valid) {
          const params = {
            code: this.pwdForm.code,
            newPwd: this.pwdForm.newSecret,
            email: this.pwdForm.email,
            id: Cookie.get('user_id'),
          };
          const { data: res } = await this.$http.post(this.$originUrl + '/my/updatepwd', params);
          if (res.status !== 0) return this.$message.warning(res.message);
          this.getUserInfo();
          this.passwordDialog = false;
          this.$message.success('修改密码成功！');
        } else {
          return this.$message.warning('输入格式有误！');
        }
      });
    },
    // 换绑邮箱
    async sendChangeEmailReq() {
      let params = this.$qs.stringify(
        Object.assign(this.emailForm, {
          id: Cookie.get('user_id'),
        })
      );
      const { data } = await this.$http.post(this.$originUrl + '/my/updateemail', params);
      if (data.status !== 0) {
        return this.$message.warning(data.message);
      }
      this.getUserInfo();
      this.emailDialog = false;

      this.$message.success(data.message);
    },

    saveEmail() {
      // 未绑定邮箱
      if (!this.emailForm.old_email) {
        if (!this.emailForm.new_code || !this.emailForm.new_email) {
          return this.$message.error('请输入邮箱和验证码！');
        }
        this.sendChangeEmailReq();
      } else {
        // 邮箱换绑
        if (!this.emailForm.new_code || !this.emailForm.new_email || !this.emailForm.old_code) {
          return this.$message.error('请输入邮箱和验证码！');
        }
        this.sendChangeEmailReq();
      }
    },
    // 保存用户信息
    async saveUserInfo() {
      if (JSON.stringify(this.originForm) !== JSON.stringify(this.userInfoForm) || this.changeAvatar) {
        const params = new FormData();
        if (this.userInfoForm.avatar !== this.originImgUrl) {
          params.append('file', this.userInfoForm.avatar);
          if (this.originImgUrl !== null) {
            params.append('oldavatar', this.originImgUrl.split('avatar/')[1]);
          }
        }
        // 依次将文章相关信息添加到params表单中
        params.append('username', this.userInfoForm.username);
        params.append('nickname', this.userInfoForm.nickname);
        const { data: res } = await this.$http.post(this.$originUrl + '/my/userinfo', params);
        if (res.status !== 0) return this.$message.warning('修改用户信息失败！');
        this.$message.success('修改用户信息成功！');
        this.getUserInfo();
      } else {
        return this.$message.info('未对个人信息进行修改！');
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http.get(this.$originUrl + '/my/userinfo', { params: { id: Cookie.get('user_id') } });
      if (res.status !== 0) return this.$message.warning('获取用户信息失败！');
      this.userInfoForm = res.data;
      this.originForm = JSON.parse(JSON.stringify(this.userInfoForm));
      this.originImgUrl = this.userInfoForm.avatar;
      this.imgUrl = this.userInfoForm.avatar;
      // 重置
      this.emailForm = this.$options.data().emailForm;
      this.pwdForm = this.$options.data().pwdForm;
    },

    // 图片上传前处理函数
    beforeAvatarUpload(file) {
      let imgType = file.type.toLowerCase();
      let limitType = ['image/jpeg', 'image/png', 'image/jpg'];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!limitType.includes(imgType)) {
        return this.$message.error('请检查上传头像图片格式!');
      }
      if (!isLt2M) {
        return this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // 预览图地址
      this.imgUrl = URL.createObjectURL(file);
      // 图片信息
      this.userInfoForm.avatar = file;
      // 添加头像修改判断
      this.changeAvatar = true;
      // // 如果要阻止默认的发送行为，就返回 false
      return false;
    },
    //获取验证码,修改密码
    getCode() {
      let data = this.$qs.stringify({
        email: this.pwdForm.email,
        type: 2,
      });
      this.sendReq(data, 1);
    },
    getOldEmailCode() {
      console.log('old');
      let data = this.$qs.stringify({
        email: this.emailForm.old_email,
        type: 2,
      });
      this.$refs.emailForm.validateField('old_email', async (valid) => {
        if (valid === '') {
          this.sendReq(data, 2);
        } else {
          return this.$message.error('邮箱格式错误！');
        }
      });
    },
    getNewEmailCode() {
      console.log('new');
      let data = this.$qs.stringify({
        email: this.emailForm.new_email,
        type: 1,
      });
      this.$refs.emailForm.validateField('new_email', async (valid) => {
        if (valid === '') {
          const msg = this.sendReq(data, 3);
        } else {
          return this.$message.error('邮箱格式错误！');
        }
      });
    },
    async sendReq(params, type) {
      const { data: res } = await this.$http.post(this.$originUrl + '/api/users/getcode', params);
      // let res = { status: 0 };
      if (res.status === 1) {
        // 需要修改的
        return this.$message.error(res.message);
      }
      this.changeDisabled(type);
      this.countDown(type);
      return this.$message.success('验证码发送成功！');
    },
    changeDisabled(type) {
      switch (type) {
        case 1:
          this.disabled = true;
          return;
        case 2:
          this.disabled_old = true;
          return;
        case 3:
          this.disabled_new = true;
          return;
      }
    },
    countDown(type) {
      if (type === 1) {
        this.timer = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(this.timer);
            this.disabled = false;
          }
        }, 1000);
      } else if (type === 2) {
        this.oldTimer = setInterval(() => {
          this.countdown_old--;
          if (this.countdown_old === 0) {
            clearInterval(this.oldTimer);
            this.disabled_old = false;
          }
        }, 1000);
      } else {
        this.newTimer = setInterval(() => {
          this.countdown_new--;
          if (this.countdown_new === 0) {
            clearInterval(this.newTimer);
            this.disabled_new = false;
          }
        }, 1000);
      }
    },
    changeEmail() {
      this.emailForm.old_email = this.userInfoForm.email;
      this.emailDialog = true;
    },
  },
};
</script>
<style lang="less" scoped>
.height {
  margin: 40px 0;
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
.toChangeEmail {
  z-index: 3;
  top: 90px;
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
.button,
.saveBtn {
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
}
.saveBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;
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
.bottom {
  display: flex;
  justify-content: space-around;
}
/deep/ .el-input.is-disabled .el-input__inner {
  color: #231f1f;
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
</style>
