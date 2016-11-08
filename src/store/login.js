import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Cache from './lib/cache'

Vue.use(Vuex)
Vue.use(VueResource)

const moduleLogin = {
  state: {
    cache: new Cache(),
    host: 'http://192.168.3.60:3000/api',
    tid: null
  },
  mutations: {
    login (state, opts) {
      var data, callback, cache, url, cacheObj
      cache = state.cache
      data = opts.data
      if (!data.jobnumber || !data.password) {
        return
      }
      callback = opts.callback
      url = state.host + '/auth'
      Vue.http.post(url, data).then((res) => {
        data = res.body
        if (data.flag === false) {
          callback(false)
        } else {
          cache.set('authToken', data.value)
          cache.set('expired', data.expired)
          cache.set('tid', data.id)
          cacheObj = cache.gets()
          if (cacheObj.authToken && cacheObj.tid) {
            callback(true)
          }
        }
      }, (res) => {
        console.log(res)
      })
    },
    logout (state, callback) {
      var arr, obj, cache
      cache = state.cache
      arr = ['authToken', 'tid', 'expired']
      cache.removes(arr)
      obj = cache.gets()
      if (!obj.authToken) {
        callback(true)
      } else {
        callback(false)
      }
    },
    validGuard (state, callback) {
      var authToken, cache, expired, now, time, arr
      cache = state.cache
      authToken = cache.get('authToken')
      expired = cache.get('expired')
      now = new Date()
      time = now.getTime()
      if (time < expired && authToken) {
        callback(true)
      } else {
        arr = ['authToken', 'tid', 'expired']
        cache.removes(arr)
        callback(false)
      }
    }
  },
  getters: {
    getTid: state => {
      state.tid = state.cache.get('tid')
      return state.tid
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
