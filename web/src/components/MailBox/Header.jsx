import React from 'react'
import copy from 'copy-to-clipboard'
import Alert from 'react-bootstrap/Alert'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FaCopy } from 'react-icons/fa'

class MailboxHeader extends React.Component {
  state = {
    copied: false,
  }

  copyMailAddress = () => {
    const { mailAddress } = this.props
    copy(mailAddress)
    this.setState({ copied: true })
  }

  render() {
    const { mailAddress } = this.props
    const { copied } = this.state

    return (
      <Alert variant="primary">
        Welcome to your vomail inbox <b>{mailAddress}</b>
        <OverlayTrigger
          overlay={
            <Tooltip>
              {copied ? (
                <>Your address was copied to the clipboard!</>
              ) : (
                <>Click me to copy your mail address!</>
              )}
            </Tooltip>
          }
        >
          <FaCopy style={{ cursor: 'pointer' }} onClick={this.copyMailAddress} className="ml-2" />
        </OverlayTrigger>
      </Alert>
    )
  }
}

export default MailboxHeader
