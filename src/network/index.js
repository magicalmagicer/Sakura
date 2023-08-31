// import axios from 'axios'
import router from '../router'
import Cookies from 'js-cookie'
export default function setAxios() {
  //请求拦截
  axios.interceptors.request.use(config => {
    if (config.url.indexOf('/v3') == -1) {
      if (Cookies.get('token')) {
        config.headers['Authorization'] = Cookies.get('token')
      }
    }
    return config
  })
  // 响应拦截
  axios.interceptors.response.use(
    (res) => {
      //token过期
      if (res.data.status === 401) {
        router.push('/entrance');
        return;
      }
      return Promise.resolve(res);
    },
    (error) => {
      Promise.reject(error);
    }
  );
}

