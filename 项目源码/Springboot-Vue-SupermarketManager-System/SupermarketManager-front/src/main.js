/*
 * @Description: 
 * @Author: cow.horse
 * @Date: 2023-09-07 20:58:35
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//ElementUI相关
import ElementUI from 'element-ui'
//ElementUI相关
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/globel.css'
import qs from 'qs';
import './assets/font/iconfont.css'
import axios from 'axios'
Vue.prototype.qs = qs;
Vue.prototype.$axios = axios

//ElementUI相关
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
