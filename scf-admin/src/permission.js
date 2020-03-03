import router from './router'
import store from './store'
import { getIsLogin } from '@/utils/user' // 验权

function hasPermission (roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/404', '/401'] // 不重定向白名单
router.beforeEach((to, from, next) => { // to要去的页面 from当前页面 next() next(false) next('/')
  if (getIsLogin()) { // 判断是否有getIsLogin 已经登录
    if (to.path === '/login') { // 去登录页时跳到首页
      next({ path: '/' })
    } else {
      if (store.getters.loginName.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const data = res.data.data
          const permissionSet = data.permissionSet
          const loginName = data.loginName
          store.dispatch('SetLoginName', loginName)
          store.dispatch('HandlePermissions', permissionSet).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.allRouters) // 动态添加可访问路由表
            next({ ...to }) // hack方法 确保addRoutes已完成
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.allRouters, to.meta.role)) {
          next()
        } else {
          next({path: '/401', query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})
