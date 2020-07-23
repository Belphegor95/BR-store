import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    activeid: 1,
    user: {},
    count: 0, // 购物车个数
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
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedstate()]
})
