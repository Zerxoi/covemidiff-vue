import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    diffTabs: [],
    activeTabName: ""
  },
  mutations: {
    updateDiffTabs(state, tabs) {
      state.diffTabs = tabs;
    },
    updateActiveTabName(state, name) {
      state.activeTabName = name;
    }
  },
  actions: {},
  modules: {}
})
