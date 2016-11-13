var log4js = require('../utils/').log4js

module.exports = class Model {

  /**
   * 构造器
   * @param  {} name    Model名称
   * @param  {} model   Model实例
   */
  constructor(name, model) {
    this.name = name
    this.model = model
    this.logger = log4js.getLogger()
  }

  /**
   * 查询 Model 记录
   * @param  {} options   sequelize查询条件
   * @param  {} callback 
   * 错误则code返回500，无记录则为404  
   */
  __get(options, callback) {
    this.model.findOne(options).then((data) => {
      if (!data) {
        callback({
          err: this.name + ' not found',
          code: 404
        })
        return
      }
      callback(null, data.get())
    }).catch((err) => {
      callback({
        err: err,
        code: 500
      })
    })
  }

  /**
   * 查询 Model 多条记录以及Count数量
   * @param  {} options   sequelize查询条件
   * @param  {} callback
   * 错误则code返回500，无记录则为404
   */
  __gets(options, callback) {
    this.model.findAndCountAll(options)
      .then((projects) => {
        callback(null, projects)
      }).catch((err) => {        
        callback({
          err: err,
          code: 500
        })
      })
  }


  /**
   * 删除 Model 记录
   * @param  {} options   sequelize查询条件
   * @param  {} callback
   * 错误则code返回500，无记录则为404
   */
  __del(options, callback) {
    this.model.destroy(options)
      .then((deleted) => {
        callback(null, deleted)
      }).catch((err) => {
        callback({
          err: err,
          code: 500
        })
      })
  }

  /**
   * @param  {} value   插入或更新的内容
   * @param  {} options sequelize条件
   * @param  {} callback
   * 错误则code返回500，无记录则为404
   */
  __upsert(value, options, callback) {
    this.model.insertOrUpdate(value, options).then((created) => {
      if (!created) {
        callback(null, 'updated')
        return
      }
      callback(null, 'created')
    }).catch((err) => {
      callback({
        err: err,
        code: 500
      })
    })
  }
}