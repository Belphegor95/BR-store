import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant from "vant"
import { api } from "./assets/js/config";

import axios from "axios";
import qs from "qs";
Vue.config.keyCodes.caps = 20;
Vue.prototype.axios = axios;
axios.interceptors.request.use(function (config) {
  if (config.method == "post" && (config.url + '').indexOf('index/every/upload') != 1) {
    config.data = qs.stringify(config.data);
  }
  return config;
});
axios.interceptors.response.use(
  response => {
    if (response.data) {
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

import "./plugins/vant.js"

Vue.config.productionTip = false
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
