import React, { Component } from 'react'
import AdminVersion from './adminVersion'
import AdminUsers from './adminUsers'
import { apiKey } from '../_shared/constants'
import socket from '../_shared/sockets'

class Admin extends Component {
  constructor() {
    super()

    this.state = {
      version: {},
      users: {},
    }
  }

  componentDidMount() {
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
    } = this.state
    return (
      <div>
        <AdminVersion
          {...version}
        />
      {users ?
        <AdminUsers
          users={users}
          />
        : null
      }
      </div>
    )
  }
}

export default Admin
