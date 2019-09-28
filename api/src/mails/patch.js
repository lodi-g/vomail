const knex = require('../knex')

// Abstracting SQL builder
const patchMail = (mailId, read) =>
  knex
    .update({ read })
    .where({ id: mailId })
    .from('mails')

// Route handler
const handler = async (ctx, next) => {
  const mailId = ctx.params.id

  const params = ctx.request.body
  ctx.assert(params.read === true || params.read === false, 400, 'read must be a boolean')

  const n = await patchMail(mailId, params.read)
  if (n === 0) {
    ctx.status = 404
    return next()
  }

  ctx.status = 200
}

module.exports = { handler }
