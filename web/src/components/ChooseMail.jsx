import React from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

let domains = []
if (process.env.REACT_APP_DOMAINS) {
  domains = process.env.REACT_APP_DOMAINS.split(',')
}

class ChooseMail extends React.Component {
  state = {
    shouldRedirect: false,
  }

  static getDomains() {
    return domains
  }

  redirectToNewAddress = () => {
    this.setState({ shouldRedirect: true })
  }

  render() {
    const { className, username, domain, onChangeUsername, onClickDomain } = this.props
    const { shouldRedirect } = this.state

    if (shouldRedirect) {
      const mail = `${username}@${domain}`
      return <Redirect push to={`/${mail}`} />
    }

    return (
      <Form inline className={className}>
        <FormControl
          type="text"
          placeholder="Mail address"
          className="mr-sm-2"
          value={username}
          onChange={onChangeUsername}
        />
        <Dropdown className="mr-2">
          <Dropdown.Toggle variant="primary">{domain}</Dropdown.Toggle>
          <Dropdown.Menu>
            {domains.map(possibleDomain => (
              <Dropdown.Item onClick={() => onClickDomain(possibleDomain)} key={possibleDomain}>
                {possibleDomain}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button type="submit" variant="success" onClick={this.redirectToNewAddress}>
          Go!
        </Button>
      </Form>
    )
  }
}

export default ChooseMail
