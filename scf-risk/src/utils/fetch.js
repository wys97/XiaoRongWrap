import axios from 'axios'
import { Notification, Loading} from 'element-ui'
import store from '@/store'
import qs from 'qs'
let loadingInstance
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.isFormData) {
  } else {
    config.data = qs.stringify(config.data)
  }
  loadingInstance = Loading.service({ fullscreen: true, lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.1)' })
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
   response => {
     loadingInstance.close()
     const res = response.data
     if (res.code === '401') {
       store.dispatch('FedLogOut').then(() => {
         location.reload() // 为了重新实例化vue-router对象 避免bug
       })
     } else {
       if (res.code !== '200') {
//       Notification({
//         message: res.message,
//         type: 'error'
//       })
       }
       return response
     }
   },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
//  const res = response.data;
//     if (res.code !== 20000) {
//       Notification({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       });
//       // 50008:非法的isLogin; 50012:其他客户端登录了;  50014:isLogin 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload();// 为了重新实例化vue-router对象 避免bug
//           });
//         })
//       }
//       return Promise.reject('error');
//     } else {
//       return response.data;
//     }
  error => {
    console.log('err' + error)// for debug
    loadingInstance.close()
    if (error.message.includes('timeout of')) {
      error.message = '服务器超时了！'
    }
    Notification({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
