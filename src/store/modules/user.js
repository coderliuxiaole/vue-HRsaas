import { loginApi, getUserInfoApi, getUserPhoto } from '@/api/user'
import { getToken, setToken, removeToken, removeDate, setDate } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  // 存储token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },

  // 移除token
  removeToken(state) {
    state.token = null
    removeToken()
  },

  // 移除时间戳
  removeDate() {
    removeDate()
  },

  // 保存用户对象
  setUserInfo(state, result) {
    state.userInfo = result
  },

  // 重置用户对象
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 用户登录
  async login(context, data) {
    const result = await loginApi(data)
    // 登录后设置用户token
    context.commit('setToken', result)
    // 设置 token 后 设置时间戳
    setDate()
  },

  // 获取用户信息
  async getUserInfo(context) {
    const userInfo = await getUserInfoApi()
    const userPhoto = await getUserPhoto(userInfo.userId)
    context.commit('setUserInfo', { ...userInfo, ...userPhoto })
    // return
  },

  // 注销用户信息
  userLogout(context) {
    // 调用重置用户对象
    context.commit('removeUserInfo')
    // 调用删除token
    context.commit('removeToken')
    // 删除时间戳
    context.commit('removeDate')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
