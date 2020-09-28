import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { api } from "./assets/js/config";

// // 引入vue-resource
// import VueResource from 'vue-resource'

// // 使用vue-resource
// Vue.use(VueResource)
// Vue.config.productionTip = false

import Vuejsonp from "vue-jsonp"
Vue.use(Vuejsonp)

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
        router.push({
          path: '/login',
          query: router.currentRoute.fullPath
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
axios.defaults.baseURL = api.baseUrl;
// axios.defaults.baseURL = "/api";
// 允许携带cookie
axios.defaults.withCredentials = true;
function ErrCode(code) {
  if (code == 100) {
    return "参数非法"
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
  } else if (code == 402) {
    return "换绑的手机号和当前账号手机号一致，无法换绑！"
  } else if (code == 403) {
    return "输入的密码与原账号密码不一致"
  } else if (code == 601) {
    return "商品价格不满足起送!"
  } else if (code == 701) {
    return "意见建议,超过100字符!"
  } else if (code == 702) {
    return "无公告"
  } else if (code == 703) {
    return "无可用仓库"
  } else if (code == 801) {
    return "骑手已离职"
  } else if (code == 802) {
    return "仓库已休息"
  } else if (code == 803) {
    return "改单已被抢"
  } else if (code == 901) {
    return "未填写维修地址"
  } else if (code == 902) {
    return "未填写待修物品名称"
  } else if (code == 903) {
    return "待修商品名称需少于50字"
  } else if (code == 904) {
    return "未填写故障描述"
  } else if (code == 905) {
    return "故障描述不能超过500字"
  } else if (code == 906) {
    return "图片上传错误"
  } else if (code == 907) {
    return "上传的图片格式不支持"
  } else if (code == 908) {
    return "未选择维修类别"
  } else if (code == 909) {
    return "超出维修范围"
  } else if (code == 1001) {
    return "后台账号名不能为空"
  } else if (code == 1002) {
    return "后台账号密码不能为空"
  } else if (code == 1003) {
    return "后台账号长度错误"
  } else if (code == 1004) {
    return "后台账号密码长度错误"
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
