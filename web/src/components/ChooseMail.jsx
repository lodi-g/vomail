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
  constructor(props) {
    super(props)

    this.state = {
      currentUsername: props.username || '',
      currentDomain: props.domain || 'Select a domain',
      shouldRedirect: false,
    }
  }

  static getDomains() {
    return domains
  }

  redirectToNewAddress = () => {
    this.setState({ shouldRedirect: true })
  }

  onChangeUsername = e => {
    this.setState({
      currentUsername: e.currentTarget.value,
    })
  }

  onClickDomain = domain => {
    this.setState({
      currentDomain: domain,
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.shouldRedirect && nextState.shouldRedirect) {
      nextState.shouldRedirect = false
    }

    if (nextProps.username !== this.state.currentUsername) {
      nextState.currentUsername = nextProps.username
    }
    if (nextProps.domain !== this.state.currentDomain) {
      nextState.currentDomain = nextProps.domain
    }

    return true
  }

  render() {
    const { className } = this.props
    const { currentUsername, currentDomain, shouldRedirect } = this.state

    if (shouldRedirect) {
      const mail = currentUsername + '@' + currentDomain
      return <Redirect push to={{ pathname: '/' + mail }} />
    }

    return (
      <Form inline className={className}>
        <FormControl
          type="text"
          placeholder="Mail address"
          className="mr-sm-2"
          value={currentUsername}
          onChange={this.onChangeUsername}
        />
        <Dropdown className="mr-2">
          <Dropdown.Toggle variant="primary">{currentDomain}</Dropdown.Toggle>
          <Dropdown.Menu>
            {domains.map(possibleDomain => (
              <Dropdown.Item
                onClick={() => this.onClickDomain(possibleDomain)}
                key={possibleDomain}
              >
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
