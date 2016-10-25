import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import store from './store/'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import List from './view/list'
import Add from './view/add'
import More from './view/more'
import Release from './view/release'
import Addrelease from './view/addrelease'

Vue.use(Element)
Vue.use(VueRouter)

const routes = [
  {
    path: '/list/:p/:c',
    components: {
      default: List
    }
  },
  {
    path: '/add',
    components: {
      default: Add
    }
  },
  {
    path: '/more',
    components: {
      default: More
    }
  },
  {
    path: '/release/:id/:owner',
    components: {
      default: Release
    }
  },
  {
    path: '/release/add',
    components: {
      default: Addrelease
    }
  },
  { path: '/', redirect: '/list/12/1' },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
