import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面

// 路由前置守卫
router.beforeEach(function(to, from, next) {
  NProgress.start()
  // 有token
  if (store.getters.token) {
    // 判断当前地址是否要去主页
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果用户信息不存在的话 去 获取用户信息
      if (!store.getters.userName) {
        store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token 判断是否在白名单
    if (whiteList.indexOf(to.path) > -1) {
      // 在白名单内
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

// 后置守卫
router.afterEach(() => {
  NProgress.done()
})
