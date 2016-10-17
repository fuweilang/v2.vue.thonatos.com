import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'

import App from './App'
import store from './store/'

import Navbar from './components/navbar'
import List from './projects/list'

Vue.use(Element)
Vue.use(VueRouter)

const routes = [
  {
    path: '/list',
    components: {
      navbar: Navbar,
      default: List
    }
  },
  { path: '/', redirect: '/list' },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
