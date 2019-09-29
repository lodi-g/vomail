import React from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MailboxHeader from '../components/MailBox/Header'
import ActionBar from '../components/MailBox/ActionBar'
import MailCard from '../components/MailBox/MailCard'
import VomailApi from '../helpers/VomailApi'

class MailBox extends React.Component {
  state = {
    mails: [],
    redirect: false,
    clickedMailId: '',
  }

  getMailAddress = () => this.props.match.params.mailAddress

  refresh = async () => {
    const mailAddress = this.getMailAddress()

    const mails = (await VomailApi.getMailsByAddress(mailAddress)).data.mails.map(mail => ({
      ...mail,
      selected: false,
    }))
    this.setState({ mails })
  }

  mark = async ({ read }) => {
    const promises = this.state.mails
      .filter(mail => mail.selected)
      .map(mail => VomailApi.patchMail(mail.id, { read }))

    await Promise.all(promises)
    this.refresh()
  }

  delete = async () => {
    const promises = this.state.mails
      .filter(mail => mail.selected)
      .map(mail => VomailApi.deleteMail(mail.id))

    await Promise.all(promises)
    this.refresh()
  }

  selectMail = id => {
    const { mails } = this.state
    const mail = mails.find(mail => mail.id === id)

    mail.selected = !mail.selected
    this.setState({ mails })
  }

  onClick = id => {
    this.setState({ redirect: true, clickedMailId: id })
  }

  async componentDidMount() {
    this.refresh()
  }

  render() {
    const mailAddress = this.getMailAddress()
    const { mails, redirect, clickedMailId } = this.state

    if (redirect) {
      const { url } = this.props.match
      return <Redirect push to={`${url}/${clickedMailId}`} />
    }

    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <MailboxHeader mailAddress={mailAddress} />
          </Col>
        </Row>
        <hr />
        <Row>
          <ActionBar
            onRefresh={this.refresh}
            onMarkRead={() => this.mark({ read: true })}
            onMarkUnread={() => this.mark({ read: false })}
            onDelete={this.delete}
          />
        </Row>
        <div className="mt-5">
          {mails.length === 0 && (
            <p className="text-center">
              This is empty. Click refresh if you are awaiting new mails.
            </p>
          )}
          {mails.map(mail => (
            <MailCard
              {...mail}
              key={mail.subject}
              className="my-3"
              onSelect={this.selectMail}
              onClick={this.onClick}
            />
          ))}
        </div>
      </Container>
    )
  }
}

export default MailBox
