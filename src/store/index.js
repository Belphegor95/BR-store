import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    activeid: 0,
    user: {},
    count: 0, // 购物车个数
    commodity: {}, // 商品属性
    order: {},// 订单属性
    order_: {}, // 提交订单属性
    token: "",
  },
  mutations: {
    show_activeid(state, payload) {
      state.activeid = payload;
    },
    show_token(state, payload) {
      state.token = payload;
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
    show_order_(state, payload) {
      state.order_ = payload;
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedstate()],
})
// 设置要重置的参数
const getDefaultState = () => {
  return {
    activeid: 0,
    user: {},
    count: 0, // 购物车个数
    commodity: {}, // 商品属性
    order: {},// 订单属性
    order_: {}, // 提交订单属性
  }
}