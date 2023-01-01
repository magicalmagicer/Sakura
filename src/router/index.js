import Cookie from 'js-cookie'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/log',
    name: 'Log',
    component: () => import('../views/log.vue')
  },

  // 登录后
  {
    path: '/',
    // name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        redirect: '/index'
      },
      // 首页
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue')
      },
      // 歌单
      {
        path: '/music',
        // name: 'Music',
        component: () => import('../views/music.vue')
        // redirect: '/daily',
        // children: [
        //   { path: '/daily', component: () => import('../views/music/daily.vue') },
        //   { path: '/search', component: () => import('../views/music/search.vue') }
        // ]
      },
      // 发布文章
      {
        path: '/write',
        name: 'Write',
        component: () => import('../views/Publish.vue')
      },
      // 编辑文章
      {
        path: '/write/:id',
        name: 'Edit',
        prop: true,
        component: () => import('../views/Editor.vue')
      },
      // 文章详情页
      {
        path: '/detail/:id',
        name: 'Detail',

        component: () => import('../views/detail.vue')
      },
      // 个人空间、
      {
        path: '/myworld/:id',
        name: 'MyWorld',
        redirect: '/myworld/:id/mycard',
        component: () => import('../views/Myworld.vue'),
        children: [
          { path: 'mycard', component: () => import('../views/World/myCard.vue') },
          { path: 'myarticle', component: () => import('../views/World/myArticle.vue') },
          { path: 'mylikers', component: () => import('../views/World/myLikers.vue') },
          {
            path: 'mymessage',
            component: () => import('../views/World/myMessage.vue'),
            children: [
              { path: 'leavemessage', component: () => import('../components/leaveMessage.vue') },
              { path: 'replytocomment', component: () => import('../components/replyToComment.vue') }
            ]
          }
        ]
      },
      // 关于
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  // 后台登陆
  {
    path: '/backstage',
    component: () => import('../views/BackStage.vue'),
    redirect: '/users',
    children: [
      { path: '/users', component: () => import('../components/backStage/roles.vue') },
      { path: '/status', component: () => import('../components/backStage/status.vue') },
      { path: '/articles', component: () => import('../components/backStage/article.vue') },
      { path: '/category', component: () => import('../components/backStage/category.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router

// 路由守卫
router.beforeEach((to, from, next) => {
  // 刷新页面会丢失登录状态，所以刷新后要从Cookie里获取token再次存放在vuex
  if (Cookie.get('token')) store.commit('setToken', Cookie.get('token'))
  //  判断有无token，有则设置当前状态为登录状态
  if (Cookie.get('token')) {
    store.commit('changIsSignIn', 1)
  } else {
    store.commit('changIsSignIn', 0)
  }
  // 判断有没有登录
  if (store.state.token) {
    next()
  } else {
    // 未登录则去登录
    if (to.name === 'Log') {
      next()
    } else {
      next({ name: 'Log' })
    }
  }
})
