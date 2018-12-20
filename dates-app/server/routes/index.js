
const router = require('koa-router')()

const {routs} = require('../actions')
const db = require('../db')

router.post('/', routs(db))

module.exports = function() {
  return router.routes()
}