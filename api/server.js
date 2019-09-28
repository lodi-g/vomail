const Koa = require('koa')
const koaBody = require('koa-body')

const mails = require('./src/mails/')
const users = require('./src/users/')

const app = new Koa()
app.use(koaBody())

app.use(mails.routes())
app.use(users.routes())

app.listen(3000)
