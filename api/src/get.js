const knex = require('./knex')
const { addressTypes } = require('./helpers')

// Abstracting SQL builder
const getMail = mailId =>
  knex
    .select('mails.*', 'addresses.address', 'addresses.type', 'attachments.filename')
    .where({ 'mails.id': mailId })
    .join('addresses', { 'addresses.mail_id': 'mails.id' })
    .leftJoin('attachments', { 'attachments.mail_id': 'mails.id ' })
    .from('mails')

// Helpers
const unique = (val, idx, self) => self.indexOf(val) === idx

const getAddresses = (results, type) =>
  results
    .filter(res => res.type === type)
    .map(res => res.address)
    .filter(unique)

const getAttachments = results =>
  results
    .map(res => res.filename)
    .filter(v => v)
    .filter(unique)

// Route handler
const handler = async (ctx, next) => {
  const mailId = ctx.params.id

  const sqlResults = await getMail(mailId)
  if (sqlResults.length === 0) {
    ctx.status = 404
    return next()
  }

  const mail = {
    ...sqlResults[0],
    from: getAddresses(sqlResults, addressTypes.from),
    to: getAddresses(sqlResults, addressTypes.to),
    cc: getAddresses(sqlResults, addressTypes.cc),
    bcc: getAddresses(sqlResults, addressTypes.bcc),
    attachments: getAttachments(sqlResults),
  }

  delete mail['type']
  delete mail['filename']

  ctx.body = mail
}

module.exports = { handler }
