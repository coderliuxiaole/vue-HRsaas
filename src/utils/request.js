import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

// 获取时间戳方法
import { getDate } from '@/utils/auth'
// 超时时间
const timeOut = 3600

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超时时间
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use(config => {
  // 判断当用户登录状态下每次请求携带token
  if (store.getters.token) {
    // 如果条件 = 真 则说明token已经过期
    if (isCheckTimeOut()) {
      // 清除用户信息
      store.dispatch('user/userLogout')
      // 强制跳转路由
      router.push('/login')
      return Promise.reject(new Error('登录信息过期,请重新登录!'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  Promise.reject(new Error(error))
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response && error.response.data.code === 10002) {
    // 清除用户token
    store.dispatch('user/userLogout')
    // 跳转login
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

function isCheckTimeOut() {
  // 取缓存时间戳
  // 这个值取过来是秒
  var pastTime = getDate()
  var nowTime = Date.now()
  return (nowTime - pastTime) / 1000 > timeOut
}
export default service
