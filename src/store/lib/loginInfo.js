import VueCookie from 'vue-cookie'

function LoginInfo () {
  this.admin = null
  this.status = 0
}

LoginInfo.prototype.set = function (opts) {
  var admin, status
  admin = opts.admin
  status = opts.status
  if (!admin || !status || status !== 1) {
    return false
  }
  if (window.localStorage) {
    window.localStorage.admin = admin
    window.localStorage.status = status
  } else {
    VueCookie.set('admin', admin)
    VueCookie.set('status', status)
  }
  this.admin = admin
  this.status = status
  console.log(this.admin, this.status)
  return true
}

LoginInfo.prototype.get = function (opts) {
  return {
    admin: this.admin,
    status: this.status
  }
}

LoginInfo.prototype.valid = function () {
  var admin, status
  if (window.localStorage) {
    admin = window.localStorage.admin
    status = window.localStorage.status
  } else {
    admin = VueCookie.get('admin')
    status = VueCookie.get('status')
  }
  status = parseInt(status)
  if (!admin || status !== 1) {
    return false
  } else {
    this.admin = admin
    this.status = status
    return true
  }
}
var loginInfo = new LoginInfo()
export default loginInfo
