var hbs = require('hbs')
var path = require('path')
var url = require('url')
var cors = require('cors')
var express = require('express')
var bodyParser = require('body-parser')

var log4js = require('./utils/').log4js
var logger = log4js.getLogger('normal')
var app = express()

app.engine('html', require('hbs').__express)
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, './views'))

app.use(log4js.connectLogger(logger, { level: 'auto' }))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}))

app.use('/static', express.static(
  path.resolve(__dirname, './views/vue/static')
))
app.use('/swagger', express.static(
  path.resolve(__dirname, './api/swagger')
))

app.use('/', require('./router'))

app.use(function (req, res) {
  var err = new Error('Not Found');
  res.status(404)
  res.json({
    message: err.message,
    stack: err.stack
  })
})

app.use(function (err, req, res) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

module.exports = app
