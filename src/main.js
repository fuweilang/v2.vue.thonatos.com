import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'

import App from './App'
import store from './store/'

import Navbar from './components/navbar'
import List from './projects/list'
import Info from './components/info'
import Message from './components/message'
import User from './components/user'

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
  { path: '/message', component: Message },
  { path: '/info', component: Info },
  { path: '/user', component: User }
  { path: '/', redirect: '/list' },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

// loadUserInfo
store.commit('loadUser')

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
