import axios from 'axios'
import QS from 'qs'
import store from '../store'
import router from '../router'
import { Toast } from 'cube-ui'
const baseImgUrl = 'http://localhost:3000/images'

// 环境的切换
if (process.env.NODE_ENV === 'development') { // 开发环境
  axios.defaults.baseURL = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') { // 生产环境
  axios.defaults.baseURL = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
}

// 提示函数
const tip = msg => {
  Toast.$create({
    type: 'error',
    txt: msg,
    time: 1500
  }).show()
}

// 跳转登录页
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败 统一错误处理
 * @params {Number} status
 */
const errorHandle = (status, other) => {
  switch (status) {
    /**
     * 401 未登录
     * 需要跳转登录页面并携带当前页面的路径，方便登录成功后重定向
     */
    case 401:
      toLogin()
      break
    /**
     * 403 登录过期
     * 对用户提示登录过期，清除本地token信息，跳转登录页面
     */
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      store.commit('CLEAR_TOKEN')
      setTimeout(() => {
        toLogin()
      }, 1500)
      break
    /**
     * 404 请求不存在
     */
    case 404:
      tip('请求不存在')
      break
    /**
     * 其他错误直接抛出错误提示
     */
    default:
      console.log(other)
  }
}

// 设置请求超时
axios.defaults.timeout = 60000

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
axios.interceptors.request.use(
  config => {
    /**
     * 每次发请求前先判断本地是否存在token，如果存在则统一在http请求的header中加上token,
     * 这样后台可以根据token来判断前端的登录状态，但即使存在token，也可能是过期的，所以在响应拦截器中要对返回的状态做判断
    */
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  })

// 响应拦截
// Add a response interceptor
axios.interceptors.response.use(
  res => {
    /**
     * 请求成功
     * 2xx范围内的状态码都会触发该方法
     */
    if (res.status === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    /**
     * 请求失败
     * 2xx以外的状态码都会触发该方法
     */
    const response = error.response
    if (response) {
      errorHandle(response.status, response.data.msg)
      return Promise.reject(response)
    }
  }
)

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function upload (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export {
  baseImgUrl
}
