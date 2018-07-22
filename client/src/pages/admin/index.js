import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import AdminVersion from './adminVersion'
import AdminUsers from './adminUsers'
import { apiKey } from '../_shared/constants'
import AuthService from '../_components/AuthService'
import socket from '../_shared/sockets'

class Admin extends Component {
  constructor() {
    super()
    this.Auth = new AuthService()

    this.state = {
      version: {},
      users: {},
      checkRole: this.Auth.getUserIdToken(),
      userAdmin: false,
    }
  }
  componentWillMount() {
    const {
      checkRole
    } = this.state

    fetch('/vibes/api/getAllUsers', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({apiKey, _id: checkRole})
    })
    .then(res => res.json())
    .then(res => {
      if(res.users[0].role !== 1) {
        this.props.history.replace('/profile')
      } else {
        this.setState({userAdmin: true})
        this.handleFetchAdmin()
      }
    })
  }
  handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login')
  }

  handleFetchAdmin = () => {
    fetch('/vibes/api/version', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ apiKey }),
    })
      .then(res => res.json())
      .then(version => this.setState({ version }))
      .then(this.handleGetAllUsers)

    socket.on('fetchGetAllUsers', this.handleGetAllUsers)
  }

  handleGetAllUsers = () => {
    fetch('/vibes/api/getAllUsers', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ apiKey }),
    })
    .then(res => res.json())
    .then(users => this.setState({ users }))
  }

  render() {
    const {
      version,
      users: {users},
      userAdmin,
    } = this.state
    return (
      <div>
        <Button onClick={this.handleLogout} color="teal" content ="Logout" />
        <div style={{paddingTop: "15%"}}>
          <Container>

            <AdminVersion
              {...version}
            />
          {users ?
            <AdminUsers
              users={users}
            />
            : null
          }
        </Container>
        </div>
      </div>
    )
  }
}

export default Admin
