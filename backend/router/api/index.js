var express = require('express')
var router = express.Router()
var controller = require('./controller')

router.route('/project')
    .all(controller.auth.checkAccess)
    .get(controller.project.get)
    .delete(controller.project.del)
    .put(controller.project.add)

router.route('/project/:id/release')
    .all(controller.auth.checkAccess)    
    .get(controller.auth.checkRole, controller.release.get)
    .delete(controller.auth.checkRole, controller.release.del)
    .put(controller.auth.checkRole, controller.release.add)
    
router.route('/auth')
    .post(controller.auth.getToken)

router.get('/', function(req, res) {
    res.json({
        version: 'v1'
    })
})

module.exports = router