import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
import Home from './pages/home/index'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <img src={require('./pages/_shared/img/vibesBg.png')} className="bg" alt="background vibes"/>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/admin" render={() => <Admin />} />
        </Switch>
      </div>
    )
  }
}

export default App
