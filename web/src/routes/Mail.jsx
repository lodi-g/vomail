import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { FaArrowLeft, FaTrash, FaCircleNotch, FaImage } from 'react-icons/fa'

import VomailApi from '../helpers/VomailApi'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class Mail extends React.Component {
  state = {
    mail: {},
    redirect: false,
    showPictures: false,
  }

  formatAddresses = addresses => addresses.map(addr => `${addr.name} <${addr.address}>`).join(', ')

  showPictures = () => {
    this.setState({ showPictures: true })
  }

  deleteMail = async id => {
    await VomailApi.deleteMail(id)
    this.setState({ redirect: true })
  }

  async componentDidMount() {
    const { mailId } = this.props.match.params

    const mail = (await VomailApi.getMail(mailId)).data
    this.setState({ mail })

    VomailApi.patchMail(mailId, { read: true })
  }

  render() {
    const { mailAddress } = this.props.match.params
    const { mail, redirect, showPictures } = this.state

    if (!mail.from) {
      return (
        <Container className="mt-5 text-center">
          <FaCircleNotch size="5em" className="fa-spin" />
        </Container>
      )
    }

    let mailBody = mail.body
    if (!showPictures) {
      const url = /((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?/gi
      const ip = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/gi
      const urlRegex = new RegExp(url)
      const ipRegex = new RegExp(ip)

      mailBody = mail.body.replace(urlRegex, '').replace(ipRegex, '')
    }

    const mReceivedOn = moment(mail.receivedOn)

    if (redirect) {
      return <Redirect to={`/${mailAddress}`} />
    }

    return (
      <Container className="mt-5 mb-5">
        <Link to={`/${mailAddress}`}>
          <Button variant="outline-primary">
            <FaArrowLeft className="mr-2" />
            Back to mail
          </Button>
        </Link>
        <Card className="mt-5">
          <Card.Header>
            <Card.Text className="d-flex justify-content-between">
              <span>
                From: <b>{mail.from.name}</b> <i>&lt;{mail.from.address}&gt;</i>
              </span>
              <span>
                {mReceivedOn.format('DD MMM YYYY HH:mm')} (
                {moment.duration(moment().diff(mReceivedOn)).humanize()} ago)
              </span>
            </Card.Text>
            <Card.Text className="d-flex justify-content-between">
              <span>To: {this.formatAddresses(mail.to)}</span>
              <ButtonGroup>
                <Button variant="warning" onClick={() => this.showPictures()}>
                  <FaImage /> Show images
                </Button>
                <Button variant="danger" onClick={() => this.deleteMail(mail.id)}>
                  <FaTrash /> Delete
                </Button>
              </ButtonGroup>
            </Card.Text>
            {mail.cc.length !== 0 && <Card.Text>CC: {this.formatAddresses(mail.cc)}</Card.Text>}
            {mail.bcc.length !== 0 && <Card.Text>BCC: {this.formatAddresses(mail.bcc)}</Card.Text>}
          </Card.Header>
          <Card.Body>
            <Card.Title>{mail.subject}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{ __html: mailBody }} />
          </Card.Body>
          {mail.attachments.length ? (
            <Card.Footer>
              <b>Attachments:</b>
              <br />
              {mail.attachments.map(attch => (
                <a
                  key={attch}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${VomailApi.getUrl()}/${attch}`}
                  className="mr-3"
                >
                  {attch}
                </a>
              ))}
            </Card.Footer>
          ) : (
            <></>
          )}
        </Card>
      </Container>
    )
  }
}
export default Mail
