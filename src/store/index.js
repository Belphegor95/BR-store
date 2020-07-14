import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    activeid: 1
  },
  mutations: {
    show_activeid(state, payload) {
      state.activeid = payload;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedstate()]
})
