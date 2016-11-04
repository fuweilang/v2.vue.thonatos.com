import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Cache from './lib/cache'

Vue.use(Vuex)
Vue.use(VueResource)

const moduleLogin = {
  state: {
    admin: null,
    loginStatus: null,
    cache: new Cache()
  },
  mutations: {
    login (state, opts) {
      var data, callback, obj, cache
      cache = state.cache
      data = opts.data
      callback = opts.callback
      for (var key in data) {
        cache.set(key, data[key])
      }
      obj = cache.gets()
      if (obj.loginStatus && obj.admin && obj.loginStatus.toString() === data.loginStatus.toString() && obj.admin === data.admin) {
        callback(true)
      }
    },
    logout (state, callback) {
      var arr, obj, cache
      cache = state.cache
      arr = ['admin', 'loginStatus']
      cache.removes(arr)
      obj = cache.gets()
      if (!obj.admin && !obj.loginStatus) {
        callback(true)
      } else {
        callback(false)
      }
    },
    validGuard (state, callback) {
      var loginStatus, cache
      cache = state.cache
      loginStatus = cache.get('loginStatus')
      if (loginStatus && loginStatus.toString() === '1') {
        state.admin = cache.get('admin')
        callback(true)
      } else {
        callback(false)
      }
    }
  },
  getters: {
    getAdmin: state => {
      return state.admin
    }
  },
  actions: {
    login (context, opts) {
      context.commit('login', opts)
    },
    validGuard (context, callback) {
      context.commit('validGuard', callback)
    },
    logout (context, callback) {
      context.commit('logout', callback)
    }
  }
}

export default moduleLogin
