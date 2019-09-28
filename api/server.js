const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')

const mails = require('./src/mails/')
const users = require('./src/users/')

const app = new Koa()
app.use(koaBody())

app.use(mails.routes())
app.use(users.routes())
app.use(koaStatic('uploads/', { defer: true }))

app.listen(3000)
