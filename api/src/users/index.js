const Router = require('koa-router')

const get = require('./get')

const router = new Router({
  prefix: '/users',
})

router.get('/:mailAddress', get.handler)

module.exports = router
