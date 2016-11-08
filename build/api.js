var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('superagent');
var moment = require('moment');

var host = "http://developers.insta360.com/api"
var headers = {
	// 'Authentication-Token': 'cda36892924332e85fb47f4ea2f19724',
	'authToken': null
}

var requestFn = function (type, url, opts, callback) {
	var postArr, action
	type = type.toLowerCase()
	postArr = ['delelte', 'post', 'put']
	if(postArr.indexOf(type) >= 0) {
		action = 'send'
	} else {
		action = 'query'
	}
	request[type](url)
		.set(headers)
		[action](opts)
		.end(function(err, getRes){
			if(err){
				callback({
						flag: false,
						error: err
				});
				return;
			}
			callback(getRes.body)
		})
}

module.exports = function(app) {
		router.route('/auth')
			.post(function(req, res) {
				var opts = req.body
				if(!opts) {
					return
				}
				if(!opts.jobnumber || !opts.password) {
					return
				}
				host = "http://192.168.3.60:3000/api"
				url = host + '/auth'
				requestFn('post', url, opts, function(data) {
					console.log(data)
					if(data.value) {
						headers.authToken = data.value
					}
					res.json(data)
				})
			})

		router.route('/project/gets')
			.get(function(req, res) {
				var p, c, created;
				p = req.query.p
				c = req.query.c
				p = !!p ? p : 12
				c = !!c ? c : 0
				opts = {
					p: p,
					c: c
				}
				opts = {
					limit: p,
					offset: c
				}
				console.log(opts)
				host = "http://192.168.3.60:3000/api"
				url = host + '/project'
				requestFn('GET', url, opts, function(data) {
					console.log(data)
					return
					for (var i = 0; i < data.projects.length; i++) {
						created = data.projects[i].createdAt
						data.projects[i].createdAt = moment(created).format()
					}
					res.json(data)
				})
			})

		router.route('/project/getProject')
			.get(function(req, res) {
				pid = req.query.id
				if(!pid) {
					return
				}
				opts = {
					pid: pid
				}
				url = host + '/project/get'
				requestFn('GET', url, opts, function(data) {
					res.json(data)
				})
			})
		
		router.route('/project/add')
			.post(function(req, res) {
				params = req.body
				url = host + '/project/add'
				requestFn('POST', url, params, function(data) {
					res.json(data)
				})
			})

		router.route('/project/save')
			.post(function(req, res) {
				params = req.body
				pid = params.pid
				if(!pid) {
					return
				}
				url = host + '/project/save?pid=' + pid
				requestFn('POST', url, params, function(data) {
					res.json(data)
				})
			})

		router.route('/project/del')
			.post(function(req, res) {
				params = req.body
				pid = params.pid
				if(!pid) {
					return
				}
				url = host + '/project/del'
				requestFn('POST', url, params, function(data) {
					res.json(data)
				})
			})

		router.route('/release/gets')
			.get(function(req, res) {
				var p, c, pid, created
				pid = req.query.pid
				if(!pid) {
					return
				}
				p = req.query.p
				c = req.query.c
				p = !!p ? p : 12
				c = !!c ? c : 1
				opts = {
					p: p,
					c: c,
					pid: pid
				}
				url = host + '/release/gets'
				requestFn('GET', url, opts, function(data) {
					for (var i = 0; i < data.releases.length; i++) {
						created = data.releases[i].createdAt
						data.releases[i].createdAt = moment(created).format()
					}
					res.json(data)
				})
			})

		router.route('/release/getReleaseDetail')
			.get(function(req, res) {
				rid = req.query.rid
				if(!rid) {
					return
				}
				url = host + '/release/get'
				opts = {
					rid: rid
				}
				requestFn('GET', url, opts, function(data) {
					res.json(data)
				})
			})

		router.route('/release/updateRelease')
			.post(function(req, res) {
				var rid, opts, url
				opts = req.body
				rid = opts.rid
				if(!rid) {
					return
				}
				url = host + '/release/save?rid=' + opts.rid
				requestFn('post', url, opts, function(data) {
					res.json(data)
				})
			})

		router.route('/release/addRelease')
			.post(function(req, res) {
				opts = req.body
				if(!opts.projectid || !opts.maintainer) {
					return
				}
				url = host + '/release/add'
				requestFn('post', url, opts, function(data) {
					res.json(data)
				})
			})

		router.route('/release/deleteRelease')
			.post(function(req, res) {
				opts = req.body
				if(!opts.rid) {
						return
				}
				url = host + '/release/del'
				requestFn('post', url, opts, function(data) {
						res.json(data)
				})
			})

		return router;
}
















