import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import store from './store/'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Login from './login/login'
import ReleaseFrame from './release/frame'
import Projects from './release/projects'
import Addproject from './release/addproject'
import More from './release/more'
import Releaselist from './release/releaselist'
import Addrelease from './release/addrelease'

Vue.use(Element)
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
    // meta: { needGuard: true }
  },
  {
    path: '/projects/:p/:c',
    component: ReleaseFrame,
    meta: { needGuard: true },
    children: [{
      path: '/',
      components: {
        content: Projects
      }
    }]
  },
  {
    path: '/addproject',
    component: ReleaseFrame,
    meta: { needGuard: true },
    children: [{
      path: '/',
      components: {
        content: Addproject
      }
    }]
  },
  {
    path: '/more',
    component: ReleaseFrame,
    meta: { needGuard: true },
    children: [{
      path: '/',
      components: {
        content: More
      }
    }]
  },
  {
    path: '/releaselist/:id/:owner',
    component: ReleaseFrame,
    meta: { needGuard: true },
    children: [{
      path: '/',
      components: {
        content: Releaselist
      }
    }]
  },
  {
    path: '/addrelease',
    component: ReleaseFrame,
    meta: { needGuard: true },
    children: [{
      path: '/',
      components: {
        content: Addrelease
      }
    }]
  },
  { path: '/', redirect: '/projects/12/1' },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

function guardRoute (route, redirect, next) {
  store.dispatch('validGuard', function (bool) {
    if (bool) {
      next()
    } else {
      next('/login')
    }
  })
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.needGuard)) {
    guardRoute(to, from, next)
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')