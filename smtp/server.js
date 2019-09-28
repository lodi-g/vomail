const axios = require('axios')
const SMTPServer = require('smtp-server').SMTPServer
const simpleParser = require('mailparser').simpleParser

const receivingMails = {}
const axiosInst = axios.create({
  baseURL: `http://${process.env.API_HOST}:${process.env.API_PORT}/mails`,
  headers: {
    Authorization: 'Basic ' + Buffer.from(process.env.API_AUTH_TOKEN).toString('base64'),
  },
})

const sendToApi = (parsedMail, rawMail) =>
  axiosInst.post('/', {
    subject: parsedMail.subject,
    body: parsedMail.text,
    bodyHtml: parsedMail.textAsHtml,
    raw: rawMail,
    to: parsedMail.to.value,
    from: parsedMail.from.value[0],
    attachments: parsedMail.attachments,
  })

const parseAndSave = async mail => {
  try {
    const parsed = await simpleParser(mail.raw)
    await sendToApi(parsed, mail.raw)
  } catch (e) {
    console.error(e)
  }
}

const server = new SMTPServer({
  authOptional: true,

  onConnect(session, cb) {
    receivingMails[session.id] = {
      complete: false,
      raw: '',
    }
    cb()
  },

  onClose(session) {
    receivingMails[session.id].complete = false
    parseAndSave(receivingMails[session.id])
    delete receivingMails[session.id]
  },

  onData(stream, session, cb) {
    stream.on('data', chunk => {
      receivingMails[session.id].raw += chunk
    })
    stream.on('end', cb)
  },
})

server.listen(25)
