const Koa = require('koa')
const koaBody = require('koa-body')

const mails = require('./src/mails')

const app = new Koa()
app.use(koaBody())

app.use(mails.routes())

app.listen(3000)
