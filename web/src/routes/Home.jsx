import React from 'react'
import faker from 'faker'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import ChooseMail from '../components/ChooseMail'

class Home extends React.Component {
  state = {
    randomUsername: '',
    randomDomain: '',
  }

  generate = () => {
    const domains = ChooseMail.getDomains()

    const randomDomain = domains[Math.floor(Math.random() * domains.length)]
    const randomUsername = faker.internet.userName()

    this.setState({ randomDomain, randomUsername })
  }

  render() {
    const { randomDomain, randomUsername } = this.state

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
              username={randomUsername}
              domain={randomDomain}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
