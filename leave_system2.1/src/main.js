import Vue from 'vue'
import App from './App.vue'
import router  from "./router";
// import store from '@/store/index'

// {Message}
import ElementUI from 'element-ui';
// import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import leftMenu from './layout/left_menu';
import topHeader from './layout/top_header';
import mailTable from "./components/mailtable";
import map from './page/office/review_message';
import echartcard from "./components/echartCard";
import echarLib from "./components/echartLib";
import echartBook from "./components/echartBook";

import axios from "axios";
Vue.prototype.$axios = axios;

import tags from './layout/tags';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import SIdentify from './identify';
import cookie from "js-cookie";

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

Vue.component('left-menu',leftMenu);
Vue.component('top-header',topHeader);
Vue.component('tags',tags);
Vue.component('mail',mailTable);
Vue.component("cmap",map);
Vue.component("ecard",echartcard);
Vue.component("elib",echarLib);
Vue.component("ebook",echartBook);


Vue.use(ElementUI);
Vue.use(SIdentify);

Vue.prototype.$http = axios;
axios.defaults.withCredentials=true;
axios.defaults.baseURL = 'http://localhost:8888'
/*导入内容*/

router.beforeEach((to, from, next) => {
  // if (!store.state.UserToken) {
  //   if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //   }
  // } else {
  //   if (!store.state.permission.permissionList) {
  //     store.dispatch('permission/FETCH_PERMISSION').then(() => {
  //       next({ path: to.path })
  //     })
  //   } else {
  //     if (to.path !== '/login') {
  //       next()
  //     } else {
  //       next(from.fullPath)
  //     }
  //   }
  // }
  if(to.path ==='/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  cookie.set('digital_department_system_token',tokenStr,{domain:'localhost'})
  if(!tokenStr) {
    // Message({
    //   message: '请重新登录',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return next('/login')
  }

  next()
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
