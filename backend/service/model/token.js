var Sequelize = require('sequelize')
var crypto = require('../../utils/crypto')
var _sequelize = require('./_sequelize')

function genExpired(){
  return (new Date().getTime() + 2 * 3600 * 1000)
}

module.exports = _sequelize.define('token', {
  jobnumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    set: function (val) {
      var _key = new Date().getTime().toString()
      this.setDataValue('value', crypto.sha1(_key + val))
    }
  },
  expired: {
    type: Sequelize.BIGINT,
    set: function (val) {
      this.setDataValue('expired', genExpired())
    },
    defaultValue: function () {
      return genExpired()
    }
  }
}, {
    timestamps: false,
    freezeTableName: true,
    getterMethods: {
      valid: function () {
        return this.expired > new Date().getTime()
      }
    }
  })