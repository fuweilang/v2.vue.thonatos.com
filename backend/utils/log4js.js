var log4js = require('log4js')

log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: 'file',
      filename: 'logs/access.log',
      maxLogSize: 4096,
      backups: 3,
      category: 'normal'
    }
  ]
})

module.exports = log4js 