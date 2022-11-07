// import axios from 'axios'
import Cookies from 'js-cookie'
export default function setAxios() {
  //请求拦截
  axios.interceptors.request.use(config => {
    if (config.url.indexOf('/api2') == -1) {
      if (Cookies.get('token')) {
        config.headers['Authorization'] = Cookies.get('token')
      }
    }
    return config
  })
}
