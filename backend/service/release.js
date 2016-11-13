var Base = require('./Base')
var release = require('./model/').release

class Release extends Base {

    constructor() {
        super('release', release)
    }

    add(params, callback) {
        // 如果指定id，则更新，否则创建
        var id = parseInt(params.id) || false
        this.__upsert(params, id ? {
            where: {
                id: id
            }
        } : {}, callback)
    }

    del(params, callback) {
        var id = parseInt(params.id) || false
        var pid = parseInt(params.pid) || 0
        if (!id) {
            callback({
                code: 405,
                err: 'id can not be null'
            })
            return
        }
        this.__del({
            where: {
                id: id,
                pid: pid
            }
        }, callback)
    }

    get(params, callback) {
        var pid = parseInt(params.pid) || 0
        var id = parseInt(params.id) || false
        if (id) {
            this.__get({
                where: {
                    id: id,
                    pid: pid
                }
            }, callback)
            return
        }
        this.__gets({
            offset: parseInt(params.offset) || 0,
            limit: parseInt(params.limit) || 50,
            where: {
                pid: pid
            }
        }, callback)
    }

}

module.exports = new Release()