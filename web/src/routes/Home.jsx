import React from 'react'
import rug from 'random-username-generator'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import ChooseMail from '../components/ChooseMail'

rug.setSeperator('.')

class Home extends React.Component {
  state = {
    username: '',
    domain: ChooseMail.getDomains()[0],
  }

  onChangeUsername = e => {
    this.setState({
      username: e.currentTarget.value,
    })
  }

  onClickDomain = domain => {
    this.setState({
      domain,
    })
  }

  generate = () => {
    const domains = ChooseMail.getDomains()

    const domain = domains[Math.floor(Math.random() * domains.length)]
    const username = rug.generate()

    this.setState({ domain, username })
  }

  render() {
    const { domain, username } = this.state

    return (
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h1>Vomail</h1>
          </Col>
        </Row>
        <Row className="mt-4 mb-5">
          <Col>
            <p>
              vomail is a self-hosted, catch-all, trashmail solution.
              <br />
              vomail stands for vomi mail
            </p>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5">
          <Col>
            <Button onClick={this.generate}>Generate a mail address</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p>Or make your own!</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ChooseMail
              className="justify-content-center"
              username={username}
              domain={domain}
              onChangeUsername={this.onChangeUsername}
              onClickDomain={this.onClickDomain}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
