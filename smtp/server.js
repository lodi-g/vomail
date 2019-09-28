const SMTPServer = require('smtp-server').SMTPServer
const simpleParser = require('mailparser').simpleParser

const receivingMails = {}

const sendToApi = parsedMail => {
  console.log(parsedMail.subject)
}

const parseAndSave = async mail => {
  try {
    const parsed = await simpleParser(mail.raw)
    await sendToApi(parsed)
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
