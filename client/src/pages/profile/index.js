import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import AuthService from '../_components/AuthService'

class Profile extends Component {
  constructor() {
    super()

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
    console.log(this.Auth.getUserProfile())
  }
  render() {
    return(
      <div>
        <Button onClick={this.handleLogout} color="teal" content ="Logout" />
      </div>
    )
  }
}

export default Profile
