const knex = require('./knex')
const { addressTypes } = require('./helpers')

// Abstracting SQL builder
const getMail = mailId =>
  knex
    .select(
      'mails.*',
      'addresses.address',
      'addresses.name',
      'addresses.type',
      'attachments.filename',
    )
    .where({ 'mails.id': mailId })
    .join('addresses', { 'addresses.mail_id': 'mails.id' })
    .leftJoin('attachments', { 'attachments.mail_id': 'mails.id ' })
    .from('mails')

// Helpers
const getAddresses = (results, type) => {
  const correctTypeResults = results
    .filter(res => res.type === type)
    .map(res => ({ address: res.address, name: res.name }))

  const ret = []
  correctTypeResults.forEach(res => {
    if (!ret.find(t => t.address === res.address && t.name === res.name)) {
      ret.push(res)
    }
  })

  return ret
}

const getAttachments = results =>
  results
    .map(res => res.filename)
    .filter(v => v)
    .filter((val, idx, self) => self.indexOf(val) === idx)

// Route handler
const handler = async (ctx, next) => {
  const mailId = ctx.params.id

  const sqlResults = await getMail(mailId)
  if (sqlResults.length === 0) {
    ctx.status = 404
    return next()
  }

  const mail = {
    id: sqlResults[0].id,
    subject: sqlResults[0].subject,
    body: sqlResults[0].body,
    bodyHtml: sqlResults[0].body_html,
    raw: sqlResults[0].raw,
    read: sqlResults[0].read,
    receivedOn: sqlResults[0].received_on,
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
