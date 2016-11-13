var token = require('../../service/').token
var release = require('../../service/').release
var project = require('../../service/').project

class Auth {

  getToken(req, res) {
    token.generate(req.body, function (err, data) {
      if (err) {
        res
          .status(err.code || 500)
          .json({
            err: err.err
          })
        return
      }
      res.json(data)
    })
  }

  checkAccess(req, res, next) {
    var authToken = req.get('authToken')
    token.check(authToken, function (err, _token) {

      // 检查是否查询错误或者记录不存在
      if (err) {
        if (err.code == 404) {
          res.status(403).json({
            msg: 'Auth Failed.',
            err: err.err
          })
          return
        }
        res.status(err.code).json({
          msg: 'Auth Failed.',
          err: err.err
        })
        return
      }

      // 检查token是否失效,可用则保存认证信息至req.mAuth      
      if (_token.valid) {
        req.mAuth = {
          tid: _token.id,
          jobnumber: _token.jobnumber
        }
        next()
        return
      }

      // 检查失败则返回403
      res.status(403).json({
        msg: 'Auth Failed.',
        err: 'Expired Token.'
      })
    })
  }

  checkRole(req, res, next) {
    project.get(req.params, function (err, data) {
      if (err) {
        res.status(err.code || 500).json({
          err: err.err || err
        })
        return
      }

      console.log(data, req.mAuth)

      if (data.tid === req.mAuth.tid) {
        next()
        return
      }

      res.status(403).json({
        msg: 'not access to operation'
      })
    })
  }
  
}

class Project {

  add(req, res) {
    req.body.tid = req.mAuth.tid
    project.add(req.body, (err, data) => {
      if (err) {
        res.status(err.code || 500).json({
          err: err.err || err
        })
        return
      }
      res.json(data)
    })
  }

  del(req, res) {
    req.query.tid = req.mAuth.tid
    project.del(req.query, (err, data) => {
      if (err) {
        res.status(err.code || 500).json({
          err: err.err || err
        })
        return
      }
      res.json(data)
    })
  }

  get(req, res) {
    req.query.tid = req.mAuth.tid
    project.get(req.query, (err, data) => {
      if (err) {
        res.status(err.code || 500).json({
          err: err.err || err
        })
        return
      }

      // 如果是单条记录，判断权限信息，如果私有且tid不一致则返回403
      if (data.visibility && data.visibility === 'private') {
        if (data.tid === parseInt(req.mAuth.tid)) {
          res.json(data)
          return
        }
        res.status(403).json({
          code: 403,
          msg: 'not permitted.'
        })
        return
      }

      res.json(data)
    })
  }

}

class Release {

  add(req, res) {

    req.body.pid = req.params.id
    release.add(req.body, (err, data) => {
      if (err) {
        res.status(err.code || 500).json({
          err: err.err || err
        })
        return
      }
      res.json(data)
    })
  }

  del(req, res) {
    req.query.pid = req.params.id
    release.del(req.query, (err, data) => {
      if (err) {
        res.status(err.code || 500).json({
          err: err.err || err
        })
        return
      }
      res.json(data)
    })
  }

  get(req, res) {
    req.query.pid = req.params.id
    release.get(req.query, (err, data) => {
      if (err) {
        res.status(err.code || 500).json({
          err: err.err || err
        })
        return
      }
      res.json(data)
    })
  }

}

exports.auth = new Auth()
exports.release = new Release()
exports.project = new Project()