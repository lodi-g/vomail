const knex = require('./knex')
const { addressTypes } = require('./helpers')

const authToken = 'Basic ' + Buffer.from(process.env.SMTP_AUTH_TOKEN).toString('base64')

// Abstracting SQL builder
const insertMail = (subject, body, bodyHtml, raw) =>
  knex.insert({ subject, body, body_html: bodyHtml, raw }).into('mails')

const insertAddress = (mailId, person, type) =>
  knex
    .insert({ mail_id: mailId, address: person.address, name: person.name, type })
    .into('addresses')

// Route handler
const handler = async (ctx, next) => {
  const params = ctx.request.body

  // Required auth token
  const authorization = ctx.req.headers['authorization']
  ctx.assert(authorization === authToken, 403, 'Missing / invalid authorization token')

  // Form validation
  const arrayFields = ['to', 'cc', 'bcc']
  arrayFields.forEach(
    field =>
      params[field] &&
      ctx.assert(Array.isArray(params[field]), 400, `${field} field must be an array`),
  )

  let mailId
  try {
    // Inserting mail
    mailId = (await insertMail(params.subject, params.body, params.bodyHtml, params.raw))[0]

    // Inserting addresses
    await insertAddress(mailId, params.from, addressTypes.FROM)
    arrayFields.forEach(
      field =>
        params[field] &&
        params[field].forEach(
          async recipient => await insertAddress(mailId, recipient, addressTypes[field]),
        ),
    )

    // TODO: Inserting attachments
  } catch (e) {
    ctx.status = 500
    return next()
  }

  ctx.body = {
    id: mailId,
  }
}

module.exports = { handler }
