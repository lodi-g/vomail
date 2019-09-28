const knex = require('./knex')

// Abstrating SQL builder
const deleteMail = mailId =>
  knex
    .delete()
    .where({ id: mailId })
    .from('mails')

// Route handler
const handler = async (ctx, next) => {
  const mailId = ctx.params.id

  const n = await deleteMail(mailId)
  if (n === 0) {
    ctx.status = 404
    return next()
  }

  ctx.status = 204
}

module.exports = {
  handler,
}
