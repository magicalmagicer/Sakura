// import axios from 'axios'
import Cookies from 'js-cookie'
export default function setAxios() {
  //请求拦截
  axios.interceptors.request.use(config => {
    console.log(config.url)
    if (config.url.indexOf('/v3') == -1) {
      if (Cookies.get('token')) {
        config.headers['Authorization'] = Cookies.get('token')
      }
    }
    return config
  })
}
