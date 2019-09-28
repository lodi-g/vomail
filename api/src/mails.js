const Router = require('koa-router')

const { required } = require('./helpers')
const create = require('./create')
const package = require('../package.json')

const router = new Router()

router.get('/', ctx => {
  ctx.body = `${package.name} v${package.version}\n${package.description}`
})

// router.get('/:id')
router.post('/', required(['subject', 'body', 'bodyHtml', 'raw', 'from', 'to']), create.handler)
// router.patch('/:id')
// router.delete('/:id')

module.exports = router
