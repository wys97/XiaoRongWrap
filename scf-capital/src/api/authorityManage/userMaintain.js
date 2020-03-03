import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 用户维护

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * operatorName	T文本	姓名        条件查询  非必填
 * loginName	T文本	登录名    条件查询  非必填
 */
export function getListData ({page, limit,operatorName,loginName}) {
  const data = {
    page,
    limit,
    operatorName,
	loginName,
  }
  return fetch({
    url: test + '/admin/operator/list',
    method: 'post',
    data
  })
}

/**
 * 新增
 * @param limit 每页记录数
 * @param page 当前页数
 * operatorName	T文本	姓名        条件查询  非必填
 * loginName	T文本	登录名    条件查询  非必填
 */
export function addOperator ({loginName, operatorName,loginPassword}) {
  const data = {
    loginName,
    operatorName,
    loginPassword
  }
  return fetch({
    url: test + '/admin/operator/add',
    method: 'post',
    data
  })
}

/**
 * 分配角色-查询
 * @param id 角色id
 */
export function getRoleList ({id}) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/operator/role_list',
    method: 'post',
    data
  })
}

/**
 * 分配角色-修改
 * @param id 角色id
 * @param roleIds 角色 id 列表. 多个用逗号隔开
 */
export function recomposeGrantRole ({id,roleIds}) {
  const data = {
    id,
    roleIds
  }
  return fetch({
    url: test + '/admin/operator/grant_role',
    method: 'post',
    data
  })
}

/**
 * 启用禁用
 * @param id 角色id
 * @param status ENABLED （启用）或 DISABLED（禁用）
 */
export function updateStatus ({id,status}) {
  const data = {
    id,
    status
  }
  return fetch({
    url: test + '/admin/operator/update_status',
    method: 'post',
    data
  })
}

/**
 * 重置密码
 * @param id 用户id
 */
export function resetPassword ({id}) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/operator/reset_password',
    method: 'post',
    data
  })
}
export default {
  getListData,
  addOperator,
  getRoleList,
  recomposeGrantRole,
  updateStatus,
  resetPassword
}
