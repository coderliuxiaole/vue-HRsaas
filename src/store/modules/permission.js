// 静态路由 和 动态路由
import { asyncRoutes, constantRoutes } from '@/router'

// 初始化静态路由
const state = {
  routes: constantRoutes
}

const mutations = {
  setRouters(state, newRouters) {
    state.routes = [...constantRoutes, ...newRouters]
  }
}

const actions = {
  filterRouter(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRouters', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
