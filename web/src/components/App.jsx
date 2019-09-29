import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './Header'

import Home from '../routes/Home'
import MailBox from '../routes/MailBox'
import Mail from '../routes/Mail'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Header isHomeHeader={true} />
        <Home />
      </Route>
      <Route
        exact
        path="/:mailAddress"
        render={props => (
          <>
            <Header isHomeHeader={false} {...props} />
            <MailBox {...props} />
          </>
        )}
      />
      <Route
        exact
        path="/:mailAddress/:mailId"
        render={props => (
          <>
            <Header isHomeHeader={false} {...props} />
            <Mail {...props} />
          </>
        )}
      ></Route>
    </Switch>
  </Router>
)

export default App
