const URLSafeBase64 = require('urlsafe-base64')

const knex = require('../knex')
const { addressTypes } = require('../helpers')

// Abstracting SQL builder
const getMailsToUser = mailAddress =>
  knex
    .select(
      'a.address AS sender_address',
      'a.name AS sender_name',
      'm.id',
      'm.subject',
      'm.received_on',
    )
    .from({ a: 'addresses' })
    .join({ m: 'mails' }, { 'm.id': 'a.mail_id' })
    .where({ 'a.type': addressTypes.from })
    .whereIn('a.mail_id', qb =>
      qb
        .select('m2.id')
        .from({ m2: 'mails' })
        .join({ a2: 'addresses' }, { 'a2.mail_id': 'm2.id' })
        .where({ 'a2.address': mailAddress, 'a2.type': 'to' })
        .orderBy('m2.received_on', 'DESC'),
    )
    .orderBy('m.received_on', 'DESC')

// Route handler
const handler = async ctx => {
  const mailAddress = ctx.params.mailAddress

  const mails = await getMailsToUser(mailAddress).map(mail => ({
    id: URLSafeBase64.encode(mail.id),
    receivedOn: mail.received_on,
    subject: mail.subject,
    from: {
      address: mail.sender_address,
      name: mail.sender_name,
    },
  }))

  ctx.body = { mails }
}

module.exports = { handler }
