const getters = {
  sidebar: state => state.app.sidebar,
  pwdIsShow: state => state.app.pwdIsShow,
  visitedViews: state => state.app.visitedViews,
  isLogin: state => state.user.isLogin,
  platformId: state => state.user.platformId,
  nickName: state => state.permission.nickName,
  platformName: state => state.permission.platformName,
  role: state => state.permission.role,
  allRouters: state => state.permission.allRouters,
  permissionRouters: state => state.permission.permissionRouters,
  roleHasPermissions: state => state.permission.roleHasPermissions,
  loginName: state => state.permission.loginName,
  tableMaxHeight: state => state.app.tableMaxHeight
}
export default getters
