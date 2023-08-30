<template>
  <el-container>
    <el-header>
      <h1>知无不言</h1>
    </el-header>
    <el-main>
      <div class="editor">
        <el-form :model="articleForm" label-width="5vw" :rules="rules">
          <el-form-item prop="title" class="title">
            <span slot="label">
              <span class="label">标题</span>
            </span>
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item prop="catgory">
            <span slot="label">
              <span class="label">分类</span>
            </span>
            <!-- 分类下拉框 -->
            <el-select v-model="category" placeholder="请选择">
              <el-option v-for="item in AllArticleClassName" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="cover">
            <span slot="label">
              <span class="label">封面</span>
            </span>
            <el-upload class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload" action="http://127.0.0.1:3007/article/add">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="content">
            <span slot="label">
              <span class="label">内容</span>
            </span>
            <mavon-editor v-model="articleForm.content" :ishljs="true" @imgAdd="imgAdd" @fullScreen="fullscreen" codeStyle="tomorrow-night" ref="editorRef"></mavon-editor>
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button type="success" @click="trigger">保存文章</el-button>
        <el-button type="danger" @click="submitArticle">发布文章</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Cookie from 'js-cookie';
export default {
  data() {
    return {
      category: '',
      articleForm: {
        title: '',
        content: '',
        category: '',
        cover: '',
        author: 0,
        // time: ''
      },
      AllArticleClassName: [],
      imageUrl: '',
      options: [],
      rules: {
        title: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        catgory: [
          // { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
      },
    };
  },
  created() {
    this.GetAllArticleClassName();
  },
  methods: {
    trigger() {
      this.$message.info('我还是个摆设哦，文章写完就点击发布吧。');
    },
    // 编辑器全屏
    fullscreen(status, value) {
      this.$store.commit('setFullScreen', status);
    },
    // 文章发布
    async submitArticle() {
      const params = new FormData();
      this.articleForm.author_id = this.$store.state.id;
      params.append('file', this.articleForm.cover);
      // 依次将文章相关信息添加到params表单中
      params.append('title', this.articleForm.title);
      params.append('content', this.articleForm.content);
      params.append('category', this.category);
      params.append('author_id', Cookie.get('user_id'));
      const { data: res } = await this.$http.post(this.$originUrl + '/article/add', params);
      if (res.status !== 0) return this.$message.warning('文章发布失败！');
      this.$message.success('文章发布成功！');
      this.$router.push('/');
    },
    // 图片上传事件
    async imgAdd(pos, file) {
      let imgData = new FormData();
      console.log(pos, file);
      // file.miniurl.replace(/^data:image\/\w+;base64,/, '')
      imgData.append('file', file);
      const { data: res } = await this.$http.post(this.$originUrl + '/article/imgupload', imgData);
      if (res.status === 0) {
        this.$refs.editorRef.$img2Url(pos, res.data);
      }
    },
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

      this.imageUrl = URL.createObjectURL(file);
      // console.log(file)
      // 图片信息
      this.articleForm.cover = file;
      // 如果要阻止默认的发送行为，就返回 false
      return false;
    },
    // 获取文章分类列表
    async GetAllArticleClassName() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/cates');
      this.AllArticleClassName = res.data;
    },
  },
};
</script>
<style lang="less" scoped>
.el-main {
  background: transparent !important;
}
.button {
  margin-top: 50px;
  padding: 0 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.editor {
  margin-top: 30px;
}
.rule-form {
  width: 600px;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}
.el-header h1 {
  font-size: 36px;
  color: transparent;
  background-color: white;
  text-shadow: rgba(255, 255, 255, 0.5) 0 5px 6px, rgba(255, 255, 255, 0.2) 1px 3px 3px;
  background-clip: text;
}
.v-note-wrapper {
  min-height: 450px;
}
.avatar-uploader {
  // color:white,
  .el-upload {
    border: 1px dashed #9d9d9d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  color: white;
  border: 1px dashed white;
}

.avatar {
  width: 200px;
  // height: 178px;
  display: block;
}
.label {
  color: #fff !important;
  font-size: 16px !important;
}
.title {
  /deep/ .el-input__inner {
    width: 60%;
  }
}
</style>
