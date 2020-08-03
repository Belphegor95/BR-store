import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    activeid: null,
    user: null,
    count: null, // 购物车个数
    commodity: null, // 商品属性
    order: null,// 订单属性
  },
  mutations: {
    show_activeid(state, payload) {
      state.activeid = payload;
    },
    show_user(state, payload) {
      state.user = payload;
    },
    show_count(state, payload) {
      state.count = payload;
    },
    show_commodity(state, payload) {
      state.commodity = payload;
    },
    show_order(state, payload) {
      state.order = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedstate()],
  // delstate: function () {
  //   state.activeid = 1
  //   state.user = {}
  //   state.count = 0
  //   state.commodity = {}
  //   state.order = {}
  // }
})
