import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters'
import pdf from '@/components/pdf'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(pdf)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
window.onresize = function () {
  setTimeout(() => {
    store.dispatch('SetTableMaxHeight')
  }, 500)
}
