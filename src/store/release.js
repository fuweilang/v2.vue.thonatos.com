import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Cache from './lib/cache'

Vue.use(Vuex)
Vue.use(VueResource)

var getHeaders = function (state) {
  var cache, authToken, headers
  cache = state.cache
  authToken = cache.get('authToken')
  if (!authToken) {
    return
  }
  headers = {
    'authToken': authToken
  }
  return headers
}

const moduleRelease = {
  state: {
    projectlist: {},
    project: {
      name: '',
      repo: '',
      visibility: 'internal',
      desc: ''
    },
    releaselist: {},
    releaseDetail: {
      name: '',
      repo: '',
      visibility: 'internal',
      desc: ''
    },
    cache: new Cache(),
    host: 'http://192.168.3.60:3000/api'
  },
  mutations: {
    loadProjectlist (state, opts) {
      var p, c, list, limit, offset, url, headers
      p = opts.p || 12
      c = opts.c || 1
      limit = p
      offset = p * (c - 1)
      headers = getHeaders(state)
      url = state.host + '/project?limit=' + limit + '&offset=' + offset
      Vue.http.get(url, {
        emulateJSON: true,
        headers: headers
      }).then((res) => {
        list = res.body
        if (!list.rows) {
          return
        }
        if (list.rows.length <= 0) {
          return
        }
        for (var i = 0; i < list.rows.length; i++) {
          list.rows[i].deschide = true
        }
        state.projectlist = list
        state.projectlist.pageTotal = list.count
        state.projectlist.currentPage = parseInt(c)
      }, (res) => {
        console.log(res)
      })
    },
    addProject (state, opts) {
      var data, params, callback, headers, url
      params = opts.opts
      callback = opts.action
      headers = getHeaders(state)
      url = state.host + '/project'
      Vue.http.put(url, params, {
        headers: headers
      }).then((res) => {
        data = res.body
        if (data === 'created') {
          callback({
            bool: true,
            msg: 'add project success'
          })
        } else {
          callback({
            bool: false,
            msg: 'add project error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    updateProject (state, opts) {
      var data, params, callback, headers, url
      params = opts.opts
      callback = opts.action
      headers = getHeaders(state)
      url = state.host + '/project'
      Vue.http.put(url, params, {
        headers: headers
      }).then((res) => {
        data = res.body
        if (data === 'updated') {
          callback({
            bool: true,
            msg: 'update project success'
          })
        } else {
          callback({
            bool: false,
            msg: 'update project error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    getProject (state, opts) {
      var data, id, headers, url
      id = opts.id
      url = state.host + '/project?id=' + id
      headers = getHeaders(state)
      Vue.http.get(url, {
        headers: headers
      }).then((res) => {
        data = res.body
        if (data.id) {
          state.project = data
        }
        if (opts.callback) {
          opts.callback(state.project)
        }
      }, (res) => {
        console.log(res)
      })
    },
    setProjectEmpty (state) {
      state.project = {
        name: '',
        repo: '',
        visibility: 'internal',
        desc: ''
      }
    },
    deleteProject (state, opts) {
      var data, callback, url, headers
      if (!opts.id) {
        return
      }
      callback = opts.action
      headers = getHeaders(state)
      url = state.host + '/project?id=' + opts.id
      Vue.http.delete(url, { headers: headers }).then((res) => {
        data = res.body
        if (data === 1) {
          callback({
            bool: true,
            msg: 'delete project success'
          })
        } else {
          callback({
            bool: false,
            msg: 'delete project error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    loadReleaselist (state, opts) {
      var url, release, headers, p, c, limit, offset
      if (!opts.pid) {
        return
      }
      p = opts.p || 12
      c = opts.c
      if (!c) {
        c = 1
      }
      limit = p
      offset = p * (c - 1)
      url = state.host + '/project/' + opts.pid + '/release?pid=' + opts.pid + '&limit=' + limit + '&offset=' + offset
      headers = getHeaders(state)
      console.log(moduleRelease)
      Vue.http.get(url, {
        headers: headers
      }).then((res) => {
        release = res.body
        if (release.count <= 0) {
          return
        }
        console.log(release)
        for (var i = 0; i < release.rows.length; i++) {
          release.rows[i].deschide = true
        }
        state.releaselist = release
        state.releaselist.pageTotal = release.count
      }, (res) => {
        console.log(res)
      })
    },
    getReleaseDetail (state, opts) {
      var data, id, pid, headers, url
      id = opts.id
      pid = opts.pid
      if (!id || !pid) {
        return
      }
      headers = getHeaders(state)
      url = state.host + '/project/' + pid + '/release?pid=' + pid + '&id=' + id
      Vue.http.get(url, {
        headers: headers
      }).then((res) => {
        data = res.body
        if (data.id) {
          state.releaseDetail = data
        }
        if (opts.callback) {
          opts.callback(state.releaseDetail)
        }
      }, (res) => {
        console.log(res)
      })
    },
    updateRelease (state, opts) {
      var data, callback, headers, url
      callback = opts.action
      opts = opts.opts
      headers = getHeaders(state)
      url = state.host + '/project/' + opts.pid + '/release'
      Vue.http.put(url, opts, {
        headers: headers
      }).then((res) => {
        data = res.body
        if (data === 'updated') {
          callback({
            bool: true,
            msg: '修改成功'
          })
        } else {
          callback({
            bool: false,
            msg: '修改失败'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    setReleaseListEmpty (state) {
      state.releaselist = {}
    },
    setReleaseDetailEmpty (state) {
      state.releaseDetail = {
        name: '',
        repo: '',
        visibility: 'internal',
        desc: ''
      }
    },
    addRelease (state, opts) {
      var callback, data, headers, url
      callback = opts.action
      opts = opts.opts
      headers = getHeaders(state)
      url = state.host + '/project/' + opts.pid + '/release'
      Vue.http.put(url, opts, {
        headers: headers
      }).then((res) => {
        data = res.body
        if (data === 'created') {
          callback({
            bool: true,
            msg: '添加成功'
          })
        } else {
          callback({
            bool: false,
            msg: '添加失败'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    deleteRelease (state, opts) {
      var callback, data, id, pid, url, headers
      callback = opts.action
      id = opts.id
      pid = opts.pid
      if (!id || !pid) {
        return
      }
      headers = getHeaders(state)
      url = state.host + '/project/' + opts.pid + '/release?pid=' + pid + '&id=' + id
      Vue.http.delete(url, {headers: headers}).then((res) => {
        data = res.body
        if (data === 1) {
          callback({
            bool: true,
            msg: '删除成功'
          })
        } else {
          callback({
            bool: false,
            msg: '删除失败'
          })
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  getters: {
    projectlist: state => {
      return state.projectlist
    },
    project: state => {
      return state.project
    },
    releaselist: state => {
      return state.releaselist
    },
    releaseDetail: state => {
      return state.releaseDetail
    }
  },
  actions: {
    loadProjectlist (context, opts) {
      context.commit('loadProjectlist', opts)
    },
    addProject (context, opts) {
      context.commit('addProject', opts)
    },
    updateProject (context, opts) {
      context.commit('updateProject', opts)
    },
    getProject (context, opts) {
      context.commit('getProject', opts)
    },
    setProjectEmpty (context) {
      context.commit('setProjectEmpty')
    },
    deleteProject (context, opts) {
      context.commit('deleteProject', opts)
    },
    loadReleaselist (context, opts) {
      context.commit('loadReleaselist', opts)
    },
    getReleaseDetail (context, opts) {
      context.commit('getReleaseDetail', opts)
    },
    updateRelease (context, opts) {
      context.commit('updateRelease', opts)
    },
    setReleaseListEmpty (context) {
      context.commit('setReleaseListEmpty')
    },
    setReleaseDetailEmpty (context) {
      context.commit('setReleaseDetailEmpty')
    },
    addRelease (context, opts) {
      context.commit('addRelease', opts)
    },
    deleteRelease (context, opts) {
      context.commit('deleteRelease', opts)
    }
  }
}

export default moduleRelease
