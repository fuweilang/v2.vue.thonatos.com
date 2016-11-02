import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import moduleRelease from './release'
import moduleLogin from './login'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
  modules: {
    release: moduleRelease,
    login: moduleLogin
  }
})
export default store
