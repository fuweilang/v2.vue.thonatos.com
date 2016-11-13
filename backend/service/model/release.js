var Sequelize = require('sequelize')
var _sequelize = require('./_sequelize')

module.exports = _sequelize.define('release', {
  version: {
    type: Sequelize.STRING,    
    allowNull: false    
  },  
  link: {
    type: Sequelize.STRING,
    allowNull: false
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {    
    freezeTableName: true
})