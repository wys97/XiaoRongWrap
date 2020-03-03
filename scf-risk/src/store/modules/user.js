import { loginByUsername, logout, updatePassword, getUserInfo } from '@/api/user'
import { getIsLogin, setIsLogin, removeIsLogin } from '@/utils/user'

const user = {
  state: {
    isLogin: getIsLogin(),
    platformId: ''
  },

  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const loginName = userInfo.loginName.trim()
      const loginPassword = userInfo.loginPassword.trim()
      const captcha = userInfo.captcha.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(loginName, loginPassword, captcha).then(response => {
          if (response.data.code === '200') {
            setIsLogin(true)
            commit('SET_IS_LOGIN', true)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_IS_LOGIN', false)
          removeIsLogin()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改密码
    UpdatePassword ({ state }, passwordInfo) {
      const newPassword = passwordInfo.newPassword
      const oldPassword = passwordInfo.oldPassword
      return new Promise((resolve, reject) => {
        updatePassword(newPassword, oldPassword).then(response => {
          if (response.data.code === '200') {
            removeIsLogin()
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_IS_LOGIN', false)
        removeIsLogin()
        resolve()
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
