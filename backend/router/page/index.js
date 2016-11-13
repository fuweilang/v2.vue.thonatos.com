var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.locals.layout = 'hbs/layout'
    res.render('hbs/index', {
        title: 'Arashivision .Inc',
        msg: 'comming soon.',
        date: new Date().toDateString() + ' . ' + new Date().getTime()
    })
})

module.exports = router