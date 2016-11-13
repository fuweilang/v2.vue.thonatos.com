var Sequelize = require('sequelize')
var _sequelize = require('./_sequelize')

module.exports = _sequelize.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },  
  repo: {
    type: Sequelize.STRING,
    allowNull: false
  },   
  desc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  visibility: {
    type: Sequelize.ENUM('public', 'internal', 'private'),
    allowNull: false,
    defaultValue: 'private'
  }
}, {    
    freezeTableName: true
})