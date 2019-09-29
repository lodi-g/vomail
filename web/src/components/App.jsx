import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomeHeader from './HomeHeader'
import Header from './Header'

import Home from '../routes/Home'
import MailBox from '../routes/mailbox'
import Mail from '../routes/mail'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <HomeHeader />
        <Home />
      </Route>
      <Route
        exact
        path="/:mailAddress"
        render={props => (
          <>
            <Header {...props} />
            <MailBox {...props} />
          </>
        )}
      />
      <Route
        exact
        path="/:mailAddress/:mailId"
        render={props => (
          <>
            <Header {...props} />
            <Mail {...props} />
          </>
        )}
      ></Route>
    </Switch>
  </Router>
)

export default App
