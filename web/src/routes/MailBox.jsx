import React from 'react'
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
  }

  getMailAddress = () => this.props.match.params.mailAddress

  refresh = async () => {
    const mailAddress = this.getMailAddress()

    const mails = (await VomailApi.getMailsByAddress(mailAddress)).data.mails
    this.setState({ mails })
  }

  selectMail = id => {
    console.log('selecting id', id)
  }

  async componentDidMount() {
    this.refresh()
  }

  render() {
    const mailAddress = this.getMailAddress()
    const { mails } = this.state

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
          {mails.map(mail => (
            <MailCard {...mail} key={mail.subject} className="my-3" onSelect={this.selectMail} />
          ))}
        </div>
      </Container>
    )
  }
}

export default MailBox
