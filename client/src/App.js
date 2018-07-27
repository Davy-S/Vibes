import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import UserProfile from './pages/userProfiles'
import Navbar from './pages/_components/Navbar'
import AuthService from './pages/_components/AuthService'
import './App.css'

class App extends Component {
  constructor() {
    super()

    this.Auth = new AuthService()
  }
  render() {
    return (
      <div>
        <img src={require('./pages/_shared/img/vibesBg.png')} className="bg" alt="background vibes"/>
        {this.Auth.loggedIn() ?
          <Navbar /> : null
        }
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user" component={UserProfile} />
        </Switch>
      </div>
    )
  }
}

export default App
