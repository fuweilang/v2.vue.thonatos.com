var crypto = require('crypto')

module.exports = {
  sha1: function (val) {
    var sha1 = crypto.createHash('sha1')
    sha1.update(val)
    return sha1.digest('hex')
  },
  base64encode: function (val) {
    return new Buffer(val).toString('base64')
  },
  base64decode: function (val) {    
    return new Buffer(val, 'base64').toString('ascii')    
  }
}