import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { api } from "./assets/js/config";

import axios from "axios";
import qs from "qs";
import "./plugins/vant.js"
Vue.config.keyCodes.caps = 20;
Vue.prototype.axios = axios;
axios.interceptors.request.use(function (config) {
  if (config.method == "post") {
    config.data = qs.stringify(config.data);
  }
  return config;
});
axios.interceptors.response.use(
  response => {
    if (response.data) {
      // 没登录 跳转登录页面
      if (response.data.msg && response.data.msg == 112) {
        router.replace({
          path: '/login',
        })
      }
      return response.data;
    } else {
      return response;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
// axios.defaults.baseURL = api.baseUrl;
axios.defaults.baseURL = "/api";
// 允许携带cookie
axios.defaults.withCredentials = true;
function ErrCode(code) {
  if (code == 100) {
    return "参数非法"
  } else if (code == 102) {
    return "请输入正确的密码！"
  } else if (code == 102) {
    return "请输入正确的密码！"
  } else if (code == 103) {
    return "密码不正确！"
  } else if (code == 104) {
    return "账号不存在！"
  } else if (code == 105) {
    return "验证码不正确！"
  } else if (code == 106) {
    return "请输入正确的单位名称！"
  } else if (code == 107) {
    return "请输入正确的联系人！"
  } else if (code == 108) {
    return "请输入正确的地址！"
  } else if (code == 109) {
    return "请输入正确的详细地址！"
  } else if (code == 110) {
    return "该手机号已被注册！"
  } else if (code == 111) {
    return "验证码失效！"
  } else if (code == 112) {
    return "未登录或登录信息失效！"
  } else if (code == 301) {
    return "最多只能保存10个地址！"
  } else if (code == 401) {
    return "换绑需要提供新手机账号的密码！"
  } else {
    return "操作失败！"
  }
}
Vue.prototype.ErrCode = ErrCode


Vue.config.productionTip = false
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
