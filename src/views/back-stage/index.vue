<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="@/assets/feng.jpg" alt="" class="img" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollaspe ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu :default-active="activePath" router unique-opened background-color="#333744" text-color="#fff" active-text-color="#409EFF" :collapse="isCollaspe" :collapse-transition="false">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <!-- 一级菜单文本 -->
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" @click="saveNavState('/' + subItem.path)" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    // this.getMenuList()
    this.activePath = '/users'
  },
  data() {
    return {
      isCollaspe: false,
      // 被激活的地址连接
      activePath: '',
      // 左侧菜单数据
      menuList: [
        {
          id: 1,
          name: '用户管理',
          path: 'users',
          children: [
            { id: 10, name: '用户列表', path: 'users' },
            { id: 11, name: '登录信息', path: 'status' }
          ]
        },
        // {
        //   id: 2,
        //   name: '权限管理',
        //   path: 'users',
        //   children: [
        //     { id: 20, name: '', path: 'rights' }
        //     // { id: 21, name: '权限分配', path: 'rights' }
        //   ]
        // },
        {
          id: 3,
          name: '文章管理',
          path: 'articles',
          children: [
            { id: 30, name: '文章列表', path: 'articles' },
            { id: 31, name: '文章分类', path: 'category' }
          ]
        }
      ],
      iconsObj: {
        1: 'el-icon-user-solid',
        2: 'el-icon-collection',
        3: 'el-icon-edit-outline',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollaspe = !this.isCollaspe
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  background-color: #373d41;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.img {
  border-radius: 50px;
  width: 50px;
}
</style>
