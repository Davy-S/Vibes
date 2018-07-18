import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </div>
    )
  }
}

export default App
