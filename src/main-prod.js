import '@/assets/less/font.css'
import '@babel/polyfill'
import dataV from '@jiaminghi/data-view'
import animated from 'animate.css'
// import Vue from 'vue'
// import * as echarts from 'echarts'
// 导入axios
// import axios from 'axios'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import { delCookie, getCookie, setCookie } from 'js-cookie'
import mavonEditor from 'mavon-editor' //引入mavon-editor 就是上面所安装的
import 'mavon-editor/dist/css/index.css'
import qs from 'qs'
import 'wowjs/css/libs/animate.css'
// 自己的文件
import App from './App.vue'
import setAxios from './network/index.js'
import router from './router'
import store from './store'

setAxios()

// 全局配置  挂载到vue的原型对象上  这样每个vue组件都可以通过this.$http 使用axios
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
// Vue.prototype.$cookieStore = { setCookie, getCookie, delCookie }
// Vue.use(ElementUI)
Vue.use(dataV)
Vue.use(animated)
Vue.use(mavonEditor) //让Vue使用mavonEditor
Vue.prototype.$echarts = echarts //挂载到Vue实例上面
Vue.config.productionTip = false
Vue.prototype.$originUrl = 'http://43.138.252.149:3007';
Vue.prototype.$originUrl2 = 'http://43.138.252.149:3000';
// Vue.prototype.$originUrl = 'http://127.0.0.1'
// Vue.prototype.$originUrl2 = 'http://120.46.168.254:3000'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
