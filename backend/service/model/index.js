var token = require('./token')
var project = require('./project')
var release = require('./release')

release.belongsTo(project, { foreignKey: 'pid'})
project.belongsTo(token, { foreignKey: 'tid'})

exports.project = project
exports.release = release
exports.token = token