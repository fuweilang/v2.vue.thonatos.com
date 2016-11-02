import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const moduleRelease = {
  state: {
    projectlist: {},
    project: {
      name: '',
      link: '',
      tags: '',
      visibility: 'internal',
      desc: ''
    },
    releaselist: {},
    releaseDetail: {}
  },
  mutations: {
    loadProjectlist (state, opts) {
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
        if (!list.projects) {
          return
        }
        for (var i = 0; i < list.projects.length; i++) {
          list.projects[i].deschide = true
        }
        state.projectlist = list
        state.projectlist.pageTotal = list.pageCount * list.perPageNum
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
          opts.callback(state.project)
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
    loadReleaselist (state, opts) {
      var url, release
      url = './api/release/gets?pid=' + opts.pid + '&p=' + opts.p + '&c=' + opts.c
      Vue.http.get(url).then((res) => {
        release = res.body
        for (var i = 0; i < release.releases.length; i++) {
          release.releases[i].deschide = true
        }
        state.releaselist = release
        state.releaselist.pageTotal = release.pageCount * release.perPageNum
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
          opts.callback(state.releaseDetail)
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
}

export default moduleRelease
