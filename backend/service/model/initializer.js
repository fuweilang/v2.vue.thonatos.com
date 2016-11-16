var sequelize = require('./_sequelize')

var token = require('./token')
var project = require('./project')
var release = require('./release')

release.belongsTo(project, { foreignKey: 'pid'})
project.belongsTo(token, { foreignKey: 'tid'})

module.exports = function (callback) {  

  var _callback = callback || function(err, msg){
    if(err){
      console.log(err)
      return
    }
    console.log(msg)
  }
  sequelize.sync({ force: true }).then(function () {     
    _callback(null, 'Sync Database Success')    
  }).catch(function (e) {
    console.log('err', e)
    _callback('Sync Database Failed.')
  })
}