import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import ChooseMail from './ChooseMail'

function HomeHeader({ match }) {
  const { mailAddress } = match.params
  const [username, domain] = mailAddress.split('@')

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand>
        <Nav.Link as={Link} to="/">
          vomail
        </Nav.Link>
      </Navbar.Brand>
      <Nav className="mx-auto">
        <ChooseMail username={username} domain={domain} />
      </Nav>
      <Nav className="ml-auto">
        <Navbar.Text>
          <a href="https://github.com/lodi-g/vomail" target="_blank" rel="noopener noreferrer">
            Want to host your own vomail?
          </a>
        </Navbar.Text>
      </Nav>
    </Navbar>
  )
}
export default HomeHeader
