var path = require('path')
var Sequelize = require('sequelize')

module.exports = new Sequelize('developer_insta360', 'root', 'mysql', {  
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  logging: process.NODE_DEBUG || false
  // SQLite only
  // storage: path.join(process.cwd(), 'db.sqlite')

  // dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
})