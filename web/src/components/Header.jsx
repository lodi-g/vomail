import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import ChooseMail from './ChooseMail'

function HomeHeader({ isHomeHeader, ...props }) {
  let username, domain

  if (!isHomeHeader) {
    const { mailAddress } = props.match.params
    let mailInfos = mailAddress.split('@')
    username = mailInfos[0]
    domain = mailInfos[1]
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand>
        <Nav.Link as={Link} to="/">
          vomail
        </Nav.Link>
      </Navbar.Brand>
      {!isHomeHeader && (
        <Nav className="mx-auto">
          <ChooseMail username={username} domain={domain} />
        </Nav>
      )}
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
