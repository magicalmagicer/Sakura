import Cookie from 'js-cookie'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/entrance',
    name: 'Entrance',
    component: () => import('@/views/entrance.vue'),
    redirect: '/login',
    children: [
      {
        path: '/login',
        component: () => import('@/components/register-login-component/login.vue')
      }
    ]
  },

  // 登录后
  {
    path: '/',
    component: () => import('@/views/front-page/index.vue'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      // 首页
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/front-page/home.vue')
      },
      // 歌单
      {
        path: '/music',
        component: () => import('@/views/front-page/music.vue')
      },
      // 发布文章
      {
        path: '/write',
        name: 'Write',
        component: () => import('@/views/front-page/publish-article.vue')
      },
      // 编辑文章
      {
        path: '/write/:id',
        name: 'Edit',
        prop: true,
        component: () => import('@/views/front-page/aticle/editor.vue')
      },
      // 文章详情页
      {
        path: '/detail/:id',
        name: 'Detail',

        component: () => import('@/views/front-page/aticle/article-details.vue')
      },
      // 个人空间、
      {
        path: '/myworld/:id',
        name: 'MyWorld',
        redirect: '/myworld/:id/mycard',
        component: () => import('@/views/front-page/myworld.vue'),
        children: [
          { path: 'mycard', component: () => import('@/components/World/myCard.vue') },
          { path: 'myarticle', component: () => import('@/components/World/myArticle.vue') },
          { path: 'mylikers', component: () => import('@/components/World/myLikers.vue') },
          {
            path: 'mymessage',
            component: () => import('@/components/World/myMessage.vue'),
            children: [
              { path: 'leavemessage', component: () => import('@/components/World/my-message/leaveMessage.vue') },
              { path: 'replytocomment', component: () => import('@/components/World/my-message/replyToComment.vue') }
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
        component: () => import(/* webpackChunkName: "about" */ '@/views/front-page/about.vue')
      }
    ]
  },
  // 后台登陆
  {
    path: '/backstage',
    component: () => import('@/views/back-stage/index.vue'),
    redirect: '/users',
    children: [
      { path: '/users', component: () => import('@/views/back-stage/roles.vue') },
      { path: '/status', component: () => import('@/views/back-stage/status.vue') },
      { path: '/articles', component: () => import('@/views/back-stage/article.vue') },
      { path: '/category', component: () => import('@/views/back-stage/category.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
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
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
