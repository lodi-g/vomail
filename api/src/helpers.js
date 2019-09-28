const required = requirements => {
  return async (ctx, next) => {
    for (const r of requirements) {
      ctx.assert(ctx.request.body[r], 400, `Query must contain ${requirements} fields`)
    }
    await next()
  }
}

const addressTypes = {
  to: 'to',
  from: 'from',
  cc: 'cc',
  bcc: 'bcc',
}

module.exports = { required, addressTypes }
