import Cookie from 'js-cookie'
import Vue from 'vue'
import VueRouter from 'vue-router'
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
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/admin/article.vue'),
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  },
  {
    // 编辑文章
    path: '/editArticle/:id?',
    name: 'editArticle',
    component: () => import('../views/admin/articleEdit.vue'),
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  },
  {
    // 书籍编辑
    path: '/bookEdit',
    name: 'bookEdit',
    component: () => import('../views/admin/bookEdit.vue'),
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  },
  {
    // 书籍发布
    path: '/bookPublish/:id?',
    name: 'bookPublish',
    component: () => import('../views/admin/bookPublish.vue'),
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

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
  //  先判断去的页面是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断有没有登录
    if (store.state.token) {
      // 有登录 ,则判断去的路由是否为 我的博客
      // 去我的博客之前拦截，判断当前用户是否为管理员，如果是管理员，则next()
      if (to.name === 'admin') {
        let nickname = sessionStorage.getItem('nickname')
        if (nickname === '罗废鱼') {
          next()
        } else {
          // 否则直接返回到home页面
          next({ name: 'Log' })
        }
      } else {
        next()
      }
    } else {
      // 未登录则去登录
      if (to.name === 'Log') {
        next()
      } else {
        next({ name: 'Log' })
      }
    }
  } else {
    // 不需要登录权限的页面直接next
    next()
  }
})
