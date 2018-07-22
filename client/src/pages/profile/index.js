import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import AuthService from '../_components/AuthService'
import { apiKey } from '../_shared/constants'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
    }
    this.Auth = new AuthService()
  }

  handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login')
  }

  componentWillMount(){
    if(!this.Auth.loggedIn()) {
      this.props.history.replace('/login')
    }
  }

  componentDidMount() {
    const _id = this.Auth.getUserProfile()
    fetch('/vibes/api/getAllUsers', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apiKey, _id}),
    })
    .then(res => res.json())
    .then(user => this.setState({user}))

  }
  render() {
    console.log(this.state.user)
    return(
      <div>
        <Button onClick={this.handleLogout} color="teal" content ="Logout" />
      </div>
    )
  }
}

export default Profile
