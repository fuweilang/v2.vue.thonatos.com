import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    admin: 'thonatos@sina.com',
    info: {
      active: false,
      submit_text: '初始化',
      msg: ''
    },
    list: {},
    project: {
      name: '',
      link: '',
      tags: '',
      visibility: 'internal',
      desc: ''
    },
    release: {},
    releaseDetail: {}
  },
  mutations: {
    loadList (state, opts) {
      var p, c, list
      if (typeof opts === 'undefined' || opts == null) {
        p = 12
        c = 1
      } else {
        p = opts.p
        c = opts.c
      }
      Vue.http.get('./api/project/gets?p=' + p + '&c=' + c).then((res) => {
        list = res.body
        for (var i = 0; i < list.projects.length; i++) {
          list.projects[i].deschide = true
        }
        state.list = list
        state.list.pageTotal = list.pageCount * list.perPageNum
      }, (res) => {
        console.log(res)
      })
    },
    addProject (state, opts) {
      var data, params, callback
      params = opts.opts
      callback = opts.action
      Vue.http.post('./api/project/add', params).then((res) => {
        data = res.body
        if (data.code === '200') {
          callback({
            code: 1,
            msg: 'add project success'
          })
        } else {
          callback({
            code: 0,
            msg: 'add project error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    updateProject (state, opts) {
      var data, params, callback
      params = opts.opts
      callback = opts.action
      Vue.http.post('./api/project/save', params).then((res) => {
        data = res.body
        if (data.code === '200') {
          callback({
            code: 1,
            msg: 'update project success'
          })
        } else {
          callback({
            code: 0,
            msg: 'update project error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    getProject (state, opts) {
      var data, id
      id = opts.id
      Vue.http.get('./api/project/getProject?id=' + id).then((res) => {
        data = res.body
        if (data._id) {
          state.project = data
          state.project.tags = state.project.tags.join(',')
        }
        if (opts.callback) {
          opts.callback()
        }
      }, (res) => {
        console.log(res)
      })
    },
    setProjectEmpty (state) {
      state.project = {
        name: '',
        link: '',
        tags: '',
        visibility: 'internal',
        desc: ''
      }
    },
    deleteProject (state, opts) {
      var data, pid, callback
      pid = opts.pid
      callback = opts.action
      Vue.http.post('./api/project/del', {pid: pid}).then((res) => {
        data = res.body
        if (data.code === '200') {
          callback({
            code: 1,
            msg: 'delete project success'
          })
        } else {
          callback({
            code: 0,
            msg: 'delete project error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    loadRelease (state, opts) {
      var url, release
      url = './api/release/gets?pid=' + opts.pid + '&p=' + opts.p + '&c=' + opts.c
      Vue.http.get(url).then((res) => {
        release = res.body
        for (var i = 0; i < release.releases.length; i++) {
          release.releases[i].deschide = true
        }
        state.release = release
        state.release.pageTotal = release.pageCount * release.perPageNum
      }, (res) => {
        console.log(res)
      })
    },
    getReleaseDetail (state, opts) {
      var data, rid
      rid = opts.rid
      Vue.http.get('./api/release/getReleaseDetail?rid=' + rid).then((res) => {
        data = res.body
        if (data._id) {
          state.releaseDetail = data
        }
        if (opts.callback) {
          opts.callback()
        }
      }, (res) => {
        console.log(res)
      })
    },
    updateRelease (state, opts) {
      var data, callback
      callback = opts.action
      opts = opts.opts
      Vue.http.post('./api/release/updateRelease', opts).then((res) => {
        data = res.body
        if (data.code === '200') {
          callback({
            code: 1,
            msg: 'update release success'
          })
        } else {
          callback({
            code: 0,
            msg: 'update release error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    setReleaseEmpty (state) {
      state.releaseDetail = {}
    },
    addRelease (state, opts) {
      var callback, data
      callback = opts.action
      opts = opts.opts
      Vue.http.post('./api/release/addRelease', opts).then((res) => {
        data = res.body
        if (data.code === '200') {
          callback({
            code: 1,
            msg: 'add release success'
          })
        } else {
          callback({
            code: 0,
            msg: 'add release error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    deleteRelease (state, opts) {
      var callback, data, rid
      callback = opts.action
      rid = opts.rid
      if (!rid) {
        return
      }
      Vue.http.post('./api/release/deleteRelease', {rid: rid}).then((res) => {
        data = res.body
        if (data.code === '200') {
          callback({
            code: 1,
            msg: 'add release success'
          })
        } else {
          callback({
            code: 0,
            msg: 'add release error'
          })
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  getters: {
    list: state => {
      return state.list
    },
    project: state => {
      return state.project
    },
    release: state => {
      return state.release
    },
    releaseDetail: state => {
      return state.releaseDetail
    },
    admin: state => {
      return state.admin
    }
  },
  actions: {
    loadList (context, opts) {
      context.commit('loadList', opts)
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
    loadRelease (context, opts) {
      context.commit('loadRelease', opts)
    },
    getReleaseDetail (context, opts) {
      context.commit('getReleaseDetail', opts)
    },
    updateRelease (context, opts) {
      context.commit('updateRelease', opts)
    },
    setReleaseEmpty (context) {
      context.commit('setReleaseEmpty')
    },
    addRelease (context, opts) {
      context.commit('addRelease', opts)
    },
    deleteRelease (context, opts) {
      context.commit('deleteRelease', opts)
    }
  }
})
