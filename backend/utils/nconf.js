var path = require('path')
var nconf = require('nconf')

var CONFIG_DEBUG = process.env.NODE_DEBUG ? '.dev.json' : '.json' 
var CONFIG_FILE = path.join(process.cwd(), './conf/dTalkConfig' + CONFIG_DEBUG)

nconf.use('file', { file: CONFIG_FILE })
nconf.load()

module.exports = nconf