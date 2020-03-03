import Cookies from 'js-cookie'

const TokenKey = 'isLogin'

export function getIsLogin () {
  return Cookies.get(TokenKey)
}

export function setIsLogin (token) {
  return Cookies.set(TokenKey, token)
}

export function removeIsLogin () {
  return Cookies.remove(TokenKey)
}
