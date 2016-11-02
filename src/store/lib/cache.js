import VueCookie from 'vue-cookie'

function Cache (namespace) {
  this.namespace = namespace || 'default'
  this.obj = {}
}

Cache.prototype.set = function (key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(key, value)
  } else {
    VueCookie.set(key, value)
  }
  this.obj[key] = value
}

Cache.prototype.gets = function (key) {
  return this.obj
}

Cache.prototype.get = function (key) {
  var value
  if (window.localStorage) {
    value = window.localStorage.getItem(key)
  } else {
    value = VueCookie.get(key)
  }
  this.obj[key] = value
  return value
}

Cache.prototype.remove = function (key) {
  if (window.localStorage) {
    window.localStorage.removeItem(key)
  } else {
    VueCookie.delete(key)
  }
  delete this.obj[key]
}

Cache.prototype.removes = function (keys) {
  if (keys.constructor === Array && keys.length > 0) {
    var i, key
    for (i = 0; i < keys.length; i++) {
      key = keys[i]
      this.remove(key)
    }
  }
}

export default Cache

