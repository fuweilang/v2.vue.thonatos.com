var app = require('./app')
var http = require('http')
var init = require('./service/model/initializer')

console.log('# Init database')
init(function (err, msg) {
  if (err) {
    console.log(err)
    return
  }
  console.log(msg)
  // http.createServer(app).listen(3000, function () {
  //   console.log('Server listen http://localhost:3000')
  // })
})