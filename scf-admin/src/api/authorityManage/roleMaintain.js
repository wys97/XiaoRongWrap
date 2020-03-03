import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 角色维护

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * roleName	T文本	角色名字
 */
export function getListData ({page, limit,roleName}) {
  const data = {
    page,
    limit,
    roleName,
  }
  return fetch({
    url: test + '/admin/role/list',
    method: 'post',
    data
  })
}

/**
 * 新增
 * @param roleName 角色名
 * @param remark 备注
 */
export function addRole ({roleName, remark}) {
  const data = {
    roleName,
    remark,
  }
  return fetch({
    url: test + '/admin/role/add',
    method: 'post',
    data
  })
}

/**
 * 角色维护-修改
 * @param id 角色id
 * @param roleName 角色名
 * @param remark 描述
 */
export function updateRole ({id,roleName,remark}) {
  const data = {
    id,
    roleName,
    remark
  }
  return fetch({
    url: test + '/admin/role/update',
    method: 'post',
    data
  })
}

/**
 * 角色维护-删除
 * @param id 角色id
 */
export function deleteRole ({id}) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/role/delete',
    method: 'post',
    data
  })
}

/**
 * 角色维护-权限列表
 * @param id 角色id
 */
export function getPermissionList ({id}) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/role/permission_list',
    method: 'post',
    data
  })
}

/**
 * 角色维护-分配权限
 * @param id 角色id
 * @param permissionCodes 权限编码Code. 多个用逗号隔开
 */
export function grantPermission ({id,permissionCodes}) {
  const data = {
    id,
    permissionCodes
  }
  return fetch({
    url: test + '/admin/role/grant_permission',
    method: 'post',
    data
  })
}
export default {
  getListData,
  addRole,
  updateRole,
  deleteRole,
  getPermissionList,
  grantPermission,
}
