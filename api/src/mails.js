const Router = require('koa-router')

const package = require('../package.json')
const { required } = require('./helpers')
const create = require('./create')
const get = require('./get')
const del = require('./delete')

const router = new Router()

router.get('/', ctx => {
  ctx.body = `${package.name} v${package.version}\n${package.description}`
})

router.get('/:id', get.handler)
router.post('/', required(['subject', 'body', 'bodyHtml', 'raw', 'from', 'to']), create.handler)
// router.patch('/:id')
router.delete('/:id', del.handler)

module.exports = router
