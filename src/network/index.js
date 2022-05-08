import axios from 'axios'
import Cookies from 'js-cookie'
// axios.defaults.baseURL = 'http://127.0.0.1:3007'
// axios.defaults.baseURL = 'http://127.0.0.1:8080'
// console.log(store)
export default function setAxios() {
  //请求拦截
  axios.interceptors.request.use(config => {
    if (config.url.indexOf('/api2') == -1) {
      if (Cookies.get('token')) {
        // 将token设置在headers ['Authorization'] 上面
        // config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtbGYiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjpudWxsLCJhdmF0YXIiOiIiLCJpYXQiOjE2NTA4OTQxNzMsImV4cCI6MTY2Mzg1NDE3M30.WRRnJXv5RsNk1ndybQz1v8jxZYie9z-RDEUgSPEGObw`
        // console.log(Cookies.get('token'))
        // console.log(`${store.state.token}`)
        config.headers['Authorization'] = Cookies.get('token')
      }
    }
    return config
  })
}
