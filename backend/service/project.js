var Base = require('./Base')
var project = require('./model/').project

class Project extends Base {

    constructor() {
        super('project', project)
    }
    
    /**
     * 添加或更新记录
     * @param  {} params
     * @param  {} callback
     * 
     * 1.不存在则创建
     * 2.存在则判断tid是否一致，不一致则无权更新     
     */
    add(params, callback) {
        this.__get({
            where: {
                name: params.name
            }
        }, (err, data) => {

            // 这里需要修改返回的状态,不存在则直接创建            
            if (err && err.code === 404) {
                this.__upsert(params, {
                }, callback)
                return
            }
            
            // 存在但tid不一致则无权更新
            if (data.tid !== params.tid) {
                callback({
                    code: 403,
                    err: 'not permitted to operate.'
                })
                return
            }
            
            // 更新记录
            this.__upsert(params, {
            }, callback)
            return
        })
    }

    /**
     * 删除记录
     * @param  {} params
     * @param  {} callback
     */
    del(params, callback) {
        var id = parseInt(params.id) || false
        var tid = parseInt(params.tid) || null
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
                tid: tid
            }
        }, callback)
    }

    /**
     * 或者单条记录或者分页数据
     * @param  {} params
     * @param  {} callback
     * 
     * 如果有id则优先查询当前id的项目，否则查询所有项目
     */
    get(params, callback) {
        var id = parseInt(params.id) || false
        var tid = parseInt(params.tid) || null        
        if (id) {
            this.__get({
                where: {
                    id: id
                }
            }, callback)
            return
        }
        this.__gets({
            offset: parseInt(params.offset) || 0,
            limit: parseInt(params.limit) || 50,
            where: {
                $or: [
                    {
                        visibility: {
                            $ne: 'private'
                        }
                    },
                    {
                        tid: {
                            $eq: tid || 0
                        }
                    }
                ]
            }
        }, callback)
    }

}

module.exports = new Project()


