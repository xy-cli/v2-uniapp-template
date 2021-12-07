import Vue from 'vue'
import App from './App'
import emoji from '@/utils/emoji'
import '@/utils/loading'
Vue.directive('emoji', emoji);

Vue.config.productionTip = false

App.mpType = 'app'

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入全局uView
import uView from "uview-ui";
Vue.use(uView);

import Vconsole from 'vconsole';
if (process.env.VUE_APP_ENV === 'qa') {
  const vconsole = new Vconsole();
  Vue.use(vconsole)
}

import zzEmpty from "./components/zz-empty";
import qLoading from "./qiun-data-charts/components/qiun-loading/qiun-loading";
Vue.component('zzEmpty', zzEmpty);
Vue.component('qLoading', qLoading);
const app = new Vue({
  store,
  ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);
app.$mount()

Vue.prototype.$setNavTitle = function (title) {
  if (dd && dd.env.platform !== 'notInDingTalk') { // 判断钉钉环境
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: title,//控制标题文本，空字符串表示显示默认文本
        onSuccess: function(result) {
        },
        onFail: function(err) {}
      });
    });
  } else {
    document.title = title
  }
}
