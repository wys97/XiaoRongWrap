import { asyncRouterMap, constantRouterMap } from '@/router' // constantRouterMap默认路由 asyncRouterMap所有的与权限相关的路由

function premissionTransfer (data) { // 权限相关
  let permission = {}
  if (data.length > 0) {
    for (let i = 0, l = data.length; i < l; i++) {
      let per
      switch (data[i]) { // "system_config.menu","system_config.operator_list.menu","system_config.operator_list.update"
        case 'supplier_manage.menu':
          per = 'supplier_manage_menu'                               // ===========供应商管理菜单  对应role你里面的roleName
          break
        case 'supplier_manage.register_list.menu':
          per = 'supplier_manage_register_list_menu'                 // ============供应商入驻菜单
          break
        case 'supplier_manage.register_list.view':
          per = 'supplier_manage_register_list_view'                 // ============供应商入驻 查看	
          break
        case 'supplier_manage.register_list.add':
          per = 'supplier_manage_register_list_add'                  // ============供应商入驻 保存
          break
        case 'supplier_manage.register_list.audit':
          per = 'supplier_manage_register_list_audit'                // ============供应商入驻 初审
          break
        case 'supplier_manage.register_list.review':
          per = 'supplier_manage_register_list_review'               // ============供应商入驻 复审
          break
          
          
        case 'core_enterprise_manage.menu':
          per = 'core_enterprise_manage_menu'                  // ============核心企业管理 菜单
          break
        case 'core_enterprise_manage.add':
          per = 'core_enterprise_manage_add'                // ============核心企业管理 新增核心企业
          break
        case 'core_enterprise_manage.list':
          per = 'core_enterprise_manage_list'               // ============核心企业管理 核心企业列表
          break  
        case 'core_enterprise_manage.list.view':
          per = 'core_enterprise_manage_list_view'               // ============核心企业管理 查看详情
          break    
        case 'core_enterprise_manage.list.view.update':
          per = 'core_enterprise_manage_list_view_update'               // ============核心企业管理 详情保存
          break      
        case 'core_enterprise_manage.list.view.delete':
          per = 'core_enterprise_manage_list_view_delete'               // ============核心企业管理 删除核心企业
          break  
          
          
          
        case 'receivable_manage.menu':
          per = 'receivable_manage_menu'                  // ============应收账款管理 菜单
          break
        case 'receivable_manage.receive_list.menu':
          per = 'receivable_manage_receive_list_menu'                // ============应收账款管理 应收账款列表
          break
        case 'receivable_manage.receive_list.view':
          per = 'receivable_manage_receive_list_view'               // ============应收账款管理 查看
          break  
        
        
        case 'finance_manage.menu':
          per = 'finance_manage_menu'                              	// ============融资审核管理菜单
          break
        case 'finance_manage.finance_list.menu':
          per = 'finance_manage_finance_list_menu'                	 // ============融资审核列表
          break
        case 'finance_manage.finance_list.view':
          per = 'finance_manage_register_list_view'                  // ============融资审核管理 查看
          break
        case 'finance_manage.finance_list.add':
          per = 'finance_manage_register_list_add'                  // ============融资审核管理 保存银行流水
          break
        case 'finance_manage.finance_list.audit':
          per = 'finance_manage_register_list_audit'                // ============融资审核管理 审核
          break
          
        case 'loan_manage.menu':
          per = 'loan_manage_menu'                              	// ============放款管理菜单
          break
        case 'loan_manage.loan_list.menu':
          per = 'loan_manage_loan_list_menu'                	 // ============放款列表
          break
        case 'loan_manage.loan_list.view':
          per = 'loan_manage_loan_list_view'                  // ============放款管理 查看
          break
        case 'loan_manage.loan_list.add':
          per = 'loan_manage_loan_list_add'                  // ============放款管理 保存银行流水
          break
        case 'loan_manage.loan_list.audit':
          per = 'loan_manage_loan_list_audit'                // ============放款管理 审核
          break
         
          
        case 'permission_manage.menu':
          per = 'permission_manage_menu'                              	// ============权限管理菜单
          break
        case 'permission_manage.operator_manage.menu':
          per = 'permission_manage_operator_manage_menu'                // ============用户维护菜单
          break
        case 'permission_manage.operator_manage.add':
          per = 'permission_manage_operator_manage_add'                	 // ============用户维护  新增
          break
        case 'permission_manage.operator_manage.grant_role':
          per = 'permission_manage_operator_manage_grant_role'                	 // ============用户维护  分配角色
          break
        case 'permission_manage.operator_manage.list':
          per = 'permission_manage_operator_manage_list'                	 // ============用户维护  查询
          break
        case 'permission_manage.operator_manage.reset_password':
          per = 'permission_manage_operator_manage_reset_password'                	 // ============用户维护  重置密码
          break
        case 'permission_manage.operator_manage.update_status':
          per = 'permission_manage_operator_manage_update_status'                	 // ============用户维护  启用禁用
          break
          
        
        case 'permission_manage.role_manage.menu':
          per = 'permission_manage_role_manage_menu'                              	// ============角色维护菜单
          break
        case 'permission_manage.role_manage.add':
          per = 'permission_manage_role_manage_add'                	 // ============角色维护  新增
          break
        case 'permission_manage.role_manage.delete':
          per = 'permission_manage_role_manage_delete'                	 // ============角色维护  删除
          break
        case 'permission_manage.role_manage.grant_permission':
          per = 'permission_manage_role_manage_grant_permission'                	 // ============角色维护  分配权限
          break
        case 'permission_manage.role_manage.list':
          per = 'permission_manage_role_manage_list'                	 // ============角色维护  查询
          break
        case 'permission_manage.role_manage.update':
          per = 'permission_manage_role_manage_update'                	 // ============角色维护  修改
          break
          
          
        case 'payment_manage.menu':
          per = 'payment_manage_menu'                              	// ============还款管理菜单
          break
        case 'payment_manage.payment_list.menu':
          per = 'payment_manage_payment_list_menu'                	 // ============还款列表
          break
        case 'payment_manage.payment_list.view':
          per = 'payment_manage_payment_list_view'                  // ============还款 查看详情
          break
          
          
        case 'payment_manage.payment_register.menu':
          per = 'payment_manage_payment_register_menu'                              	// ============商户还款登记菜单
          break
        case 'payment_manage.payment_register.view':
          per = 'payment_manage_payment_register_view'                	 // ============商户还款登记 查看详情
          break
        case 'payment_manage.payment_register.update':
          per = 'payment_manage_payment_register_update'                  // ============商户还款登记 状态更新
          break
        
        
        case 'payment_manage.payment_income.menu':
          per = 'payment_manage_payment_income_menu'                              	// ============银行进账记录菜单
          break
        case 'payment_manage.payment_income.add':
          per = 'payment_manage_payment_income_add'                	 // ============新增银行进账记录 
          break
        case 'payment_manage.payment_income.view':
          per = 'payment_manage_payment_income_view'                	 // ============银行进账记录   查看详情
          break
        case 'payment_manage.payment_income.saveSubmit':
          per = 'payment_manage_payment_income_saveSubmit'                	 // ============银行进账记录  保存并提交审核
          break
        case 'payment_manage.payment_income.auditPayment':
          per = 'payment_manage_payment_income_auditPayment'                	 // ============银行进账记录  审核还款
          break
      }
      permission[per] = true
   }
 	}
  return permission
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.roleName) {
    if (roles[route.roleName]) {
      return true
    }
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap - 所有的与权限相关的路由
 * @param roles - 对应的权限 {system-config-menu：true,operator-list-add:true}(包括当前用户的所有路由和其他操作权限)
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    allRouters: constantRouterMap, // 所有路由列表 = 固定路由 + 路由权限列表 （该角色）
    permissionRouters: [], // 路由权限列表 （该角色）
    roleHasPermissions: {}, // 权限列表 路由+功能按钮 （该角色）
    role: '', // 角色
    loginName: '', // 用户名
    platformName: '' // 平台名
  },
  mutations: {
    SET_ALL_ROUTERS: (state, routers) => {
      state.allRouters = constantRouterMap.concat(routers)
    },
    SET_PERMISSION_ROUTERS: (state, routers) => {
      state.permissionRouters = routers
    },
    CLEAN_PERMISSION_ROUTERS: (state) => {
      state.allRouters = constantRouterMap
      state.permissionRouters = []
    },
    SET_ROLE_HAS_PERMISSIONS: (state, permission) => {
      state.roleHasPermissions = permission
    },
    SET_LOGIN_NAME: (state, loginName) => {
      state.loginName = loginName
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_PLATFORM_NAME: (state, platformName) => {
      state.platformName = platformName
    }
  },
  actions: {
    HandlePermissions ({ commit }, data) {
      return new Promise(resolve => {
        const roles = premissionTransfer(data)
        let permissionRouters
        permissionRouters = filterAsyncRouter(asyncRouterMap, roles) // asyncRouterMap 所有权限路由列表（不区分角色）
        commit('SET_ALL_ROUTERS', permissionRouters)
        commit('SET_PERMISSION_ROUTERS', permissionRouters)
        commit('SET_ROLE_HAS_PERMISSIONS', roles)
        resolve()
      })
    },
    SetLoginName ({ commit }, loginName) {
      commit('SET_LOGIN_NAME', loginName)
    },
    SetRole ({commit}, role) {
      commit('SET_ROLE', role)
    },
    SetPlatformName ({commit}, platformName) {
      commit('SET_PLATFORM_NAME', platformName)
    },
    CleanPermissionRouters ({ commit }) {
      commit('CLEAN_PERMISSION_ROUTERS')
    }
  }
}

export default permission
