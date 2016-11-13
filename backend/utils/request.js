var urllib = require('urllib')
var extend = require('util')._extend

module.exports = function (url, options, callback) {

  var _callback = callback || function (err, data) {
    console.log(err, data);
  }

  if (!url) {
    _callback('url cannot be null')
    return
  }

  urllib.request(url, extend({
    method: 'GET',
    headers: {
      'Authentication-Token': ''
    }
  }, options), function (err, data, res) {
    if (err) {
      _callback({
        code: 500,
        err: err
      })
      return
    }
    if (res.statusCode !== 200) {      
      _callback({
        code: 501,
        err: data.toString()
      })
      return
    }    
    _callback(null, data.toString())
  })
}