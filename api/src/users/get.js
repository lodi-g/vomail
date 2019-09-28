const knex = require('../knex')
const { addressTypes } = require('../helpers')

// Abstracting SQL builder
const getMailsToUser = mailAddress =>
  knex
    .select('mails.id', 'mails.received_on', 'mails.subject')
    .from('mails')
    .join('addresses', { 'addresses.mail_id': 'mails.id' })
    .where({ 'addresses.address': mailAddress, 'addresses.type': addressTypes.to })

const getSendersToUser = mailIds =>
  knex
    .select('addresses.address', 'addresses.name')
    .from('addresses')
    .whereIn('mail_id', mailIds)
    .where({ 'addresses.type': addressTypes.from })

// Route handler
const handler = async ctx => {
  const mailAddress = ctx.params.mailAddress

  const mails = await getMailsToUser(mailAddress)
  const mailIds = mails.map(result => result.id)

  const senders = await getSendersToUser(mailIds)

  ctx.assert(mails.length === senders.length, 500)

  const ret = []
  for (let i = 0; i < mails.length; i++) {
    ret.push({
      id: mails[i].id,
      receivedOn: mails[i].received_on,
      subject: mails[i].subject,
      from: {
        address: senders[i].address,
        name: senders[i].name,
      },
    })
  }

  ctx.body = { data: ret }
}

module.exports = { handler }
