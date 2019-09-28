const URLSafeBase64 = require('urlsafe-base64')
const mime = require('mime-types')
const uuidv4 = require('uuid/v4')
const fs = require('fs')

const knex = require('../knex')
const { addressTypes } = require('../helpers')

const authToken = 'Basic ' + Buffer.from(process.env.SMTP_AUTH_TOKEN).toString('base64')

// Abstracting SQL builder
const insertMail = (id, subject, body, bodyHtml, raw) =>
  knex.insert({ id, subject, body, body_html: bodyHtml, raw }).into('mails')

const insertAddress = (mailId, person, type) =>
  knex
    .insert({ mail_id: mailId, address: person.address, name: person.name, type })
    .into('addresses')

const insertAttachment = (attachmentId, mailId, filename) =>
  knex.insert({ id: attachmentId, mail_id: mailId, filename }).into('attachments')

// File system handlers
const uploadAttachment = (filename, data) =>
  fs.writeFileSync(`uploads/${filename}`, Buffer.from(data))

// Route handler
const handler = async (ctx, next) => {
  const params = ctx.request.body

  console.log(params.attachments)

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

  // Inserting mail
  const mailId = Buffer.from(uuidv4(null, new Array(), 0))
  await insertMail(mailId, params.subject, params.body, params.bodyHtml, params.raw)

  // Inserting addresses
  await insertAddress(mailId, params.from, addressTypes.FROM)
  arrayFields.forEach(
    field =>
      params[field] &&
      params[field].forEach(
        async recipient => await insertAddress(mailId, recipient, addressTypes[field]),
      ),
  )

  // Inserting attachments
  params.attachments.forEach(async attachment => {
    const attachmentId = Buffer.from(uuidv4(null, new Array(), 0))
    const readableAttachmentId = URLSafeBase64.encode(attachmentId)
    const extension = mime.extension(attachment.contentType)
    const filename = readableAttachmentId + '.' + extension

    await insertAttachment(attachmentId, mailId, filename)
    uploadAttachment(filename, attachment.content.data)
  })

  ctx.body = {
    id: URLSafeBase64.encode(mailId),
  }
}

module.exports = { handler }
