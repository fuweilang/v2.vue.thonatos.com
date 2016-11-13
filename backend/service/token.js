var request = require('../utils').request
var Base = require('./Base')
var token = require('./model/').token

class Token extends Base {
    
    constructor() {
        super('token', token)
    }

    /** Token校验
     * @param  {} value     Token
     * @param  {} callback
     * 
     * 找到则返回Token记录，反之返回404
     */
    check(value, callback) {
        this.__get({
            where: {
                value: value
            }
        }, callback)
    }

    /**
     * 工号&密码验证是否为公司员工
     * 1.成功则生成一个包含工号的临时Token
     * 2.反之返回错误信息
     */
    generate(params, callback) {
        var that = this
        var jobnumber = params.jobnumber || ''
        var password = params.password || 'null'

        request('http://account.arashivision.com/user/getUserToken', {
            method: 'POST',
            data: {
                jobnumber: jobnumber,
                password: password
            }
        }, function (err, data) {
            if (err) {
                callback(err)
                return
            }

            /**
             * 创建或者更新Token
             */
            that.__upsert({
                jobnumber: jobnumber,
                value: 'mmmm',
                expired: 0
            }, {}, function (err, created) {
                if (err) {
                    callback(err)
                    return
                }
                
                // 获取创建或者更新后的Token内容
                that.__get({
                    where: {
                        jobnumber: jobnumber
                    }
                }, callback)
            })
        })
    }
}

module.exports = new Token()