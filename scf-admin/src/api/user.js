import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 用户操作相关页面

/**
 * 登录
 * @param loginName - 用户名
 * @param loginPassword - 密码
 * @param captcha - 验证码
 */
export function loginByUsername (loginName, loginPassword, captcha) {
  const data = {
    loginName,
    loginPassword,
    captcha
  }
  return fetch({
    url: test + '/admin/login',
    method: 'post',
    data
  })
}
/**
 * 退出
 */
export function logout () {
  return fetch({
    url: test + '/admin/logout'
  })
}
/**
 * 密码修改
 * @param newPassword - 用户名
 * @param oldPassword - 密码
 */
export function updatePassword (newPassword, oldPassword) {
  const data = {
    newPassword,
    oldPassword
  }
  return fetch({
    url: test + '/admin/update_login_password',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 */
export function getUserInfo () {
  return fetch({
    url: test + '/admin/current_opeartor'
  })
}
