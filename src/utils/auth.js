import Cookies from 'js-cookie'

const TokenKey = 'HR_SASS'

const DateKey = 'HR_SASS_DATA'

// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 删除时间戳
export function removeDate() {
  return Cookies.remove(DateKey)
}

// 设置时间戳
export function setDate() {
  return Cookies.set(DateKey, Date.now())
}

// 获取时间戳
export function getDate() {
  return Cookies.get(DateKey)
}
