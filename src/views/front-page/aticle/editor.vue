<template>
  <el-container>
    <el-header>
      <h1>知无不言</h1>
    </el-header>
    <el-main>
      <div class="editor">
        <el-form :model="articleDetailForm" label-width="5vw" :rules="rules">
          <el-form-item prop="title" class="title">
            <span slot="label">
              <span class="label">标题</span>
            </span>
            <el-input v-model="articleDetailForm.title"></el-input>
          </el-form-item>
          <el-form-item prop="catgory">
            <span slot="label">
              <span class="label">分类</span>
            </span>
            <!-- 分类下拉框 -->
            <el-select v-model="articleDetailForm.category" placeholder="请选择">
              <el-option v-for="item in AllArticleClassName" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <!-- 封面 -->
          <el-form-item prop="pic_url">
            <span slot="label">
              <span class="label">封面</span>
            </span>
            <el-upload class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload" action="http://43.138.252.149:3007/article/add">
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="content">
            <span slot="label">
              <span class="label">内容</span>
            </span>
            <mavon-editor v-model="articleDetailForm.content" :ishljs="true" @imgAdd="imgAdd" @imgDel="imgDel" ref="editorRef" @fullScreen="fullscreen"></mavon-editor>
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button type="danger" @click="submitNewArticle">保存修改</el-button>
        <el-button type="success" @click="back">返回</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      category: '',
      // 文章详情内容
      articleDetailForm: {
        id: 0,
        title: '',
        content: '',
        category: '',
        pic_url: '',
        author_id: 0,
        // time: ''
      },
      // articleDetailForm: {},
      AllArticleClassName: [],
      originImgUrl: '',
      imgUrl: '',
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
    // console.log(this.$route.params.id)
    this.GetArticleDetail();
    // 请求文章分类名称
    this.GetAllArticleClassName();
  },
  mounted() {
    // // 获取文本节点
    // this.$refs.editorRef.addEventListener("paste", (event) => {
    //   this.paste(event);
    // });
  },
  methods: {
    // 编辑器全屏
    fullscreen(status, value) {
      this.$store.commit('setFullScreen', status);
    },
    // 图片上传事件
    async imgAdd(pos, file) {
      let imgData = new FormData();
      console.log('这是内容图片');
      console.log(pos, file);
      // file.miniurl.replace(/^data:image\/\w+;base64,/, '')
      imgData.append('file', file);
      const { data: res } = await this.$http.post(this.$originUrl + '/article/imgupload', imgData);
      if (res.status === 0) {
        this.$refs.editorRef.$img2Url(pos, res.data);
      }
    },
    // 移除图片
    imgDel(pos) {
      console.log(pos);
    },
    back() {
      this.$router.go(-1);
    },
    // 请求文章详情
    async GetArticleDetail() {
      const { data: res } = await this.$http.get(this.$originUrl + '/article/details', { params: { id: this.$route.params.id } });
      this.articleDetailForm = res.data[0];
      this.imgUrl = this.articleDetailForm.pic_url;
      this.originImgUrl = this.articleDetailForm.pic_url;
      // console.log(this.articleDetailForm)
    },
    // 文章保存修改
    async submitNewArticle() {
      const params = new FormData();
      if (this.articleDetailForm.pic_url !== this.originImgUrl) {
        params.append('file', this.articleDetailForm.pic_url);
        if (this.originImgUrl !== '') {
          console.log(this.originImgUrl);
          params.append('oldUrl', this.originImgUrl.split('uploads/')[1]);
        }
      }

      // 依次将文章相关信息添加到params表单中
      params.append('title', this.articleDetailForm.title);
      params.append('content', this.articleDetailForm.content);
      params.append('category', this.articleDetailForm.category);
      params.append('article_id', this.articleDetailForm.id);
      const { data: res } = await this.$http.post(this.$originUrl + '/article/edit', params);

      if (res.status !== 0) return this.$message.warning('文章修改失败！');
      this.$message.success('文章修改成功！');
      this.$router.push('/');
    },

    // 图片上传前处理函数
    beforeAvatarUpload(file) {
      console.log(file);
      let imgType = file.type.toLowerCase();
      let limitType = ['image/jpeg', 'image/png', 'image/jpg'];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!limitType.includes(imgType)) {
        return this.$message.error('请检查上封面图片格式!');
      }
      if (!isLt2M) {
        return this.$message.error('上传封面大小不能超过 2MB!');
      }
      // 预览图地址
      this.imgUrl = URL.createObjectURL(file);
      // 图片信息
      this.articleDetailForm.pic_url = file;
      // 如果要阻止默认的发送行为，就返回 false
      // console.log(file)
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
  border: 0px !important;
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
  -webkit-background-clip: text;
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
  // color: #8c939d;
  color: white;
  border: 1px dashed white;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
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
// .el-form-item::after {
//   content: '';
//   display: block;
//   height: 0;
//   clear: both;
//   visibility: hidden;
//   // content: '';
//   // clear: both;
// }
</style>
