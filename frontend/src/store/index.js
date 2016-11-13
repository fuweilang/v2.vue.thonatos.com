import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import moduleRelease from './release'
import moduleLogin from './login'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

const store = new Vuex.Store({
  modules: {
    release: moduleRelease,
    login: moduleLogin
  }
})
export default store
