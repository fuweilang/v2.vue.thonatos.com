/**
 * three.js.
 */

import Vue from 'vue'
import PanoPlayer from './panoplayer/base'

export default {
  deep: true,
  params: ['muted'],
  muted: false,
  bind: function (el) {
    el.instance = new PanoPlayer()

    Vue.nextTick(function () {
      var param = {url: require('file!../assets/index.mp4')}
      el.instance.init(el, param)

      // auto resize
      el.resizeEventHandler = function () {
        el.instance.resize()
      }
      el.addEventListener('resize', el.resizeEventHandler, false)
      window.onresize = function () {
        el.instance.resize()
      }
    })
  },
  update: function (el) {
    // 点击静音按钮
    el.muted = !el.muted
    el.instance.mute(el.muted)
  },
  unbind: function (el) {
    el.instance.dispose()
    el.removeEventListener('resize', el.resizeEventHandler, false)
  }
}
