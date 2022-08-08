/*
 * @Author: ss shangs@schbrain.com
 * @Date: 2022-05-23 11:24:30
 * @LastEditors: ss shangs@schbrain.com
 * @LastEditTime: 2022-08-08 10:48:23
 * @FilePath: /v2-uni-app/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App'
import '@/utils/loading'

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// 引入全局uView
import uView from 'uview-ui'

import Vconsole from 'vconsole'

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入uView提供的对vuex的简写法文件
const vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)
Vue.use(uView)
if (process.env.VUE_APP_ENV === 'qa') {
  const vconsole = new Vconsole()
  Vue.use(vconsole)
}
const app = new Vue({
  store,
  ...App
})
Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)
app.$mount()
