var http = require('http')
var app = require('./app')
var init = require('./service/model/initializer')

function main() {
  http.createServer(app).listen(3000, function () {
    console.log('Server listen http://localhost:3000')
  })
}

// if (err) {
//   console.log('# Init database')
//   init(function (err, msg) {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log(msg)
//     main()
//   })
//   return
// }

console.log('# Using old database')
main()