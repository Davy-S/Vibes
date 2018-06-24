import React, { Component } from 'react'
import AdminVersion from './adminVersion'
import { apiKey } from '../_shared/constants'

class Admin extends Component {
  constructor() {
    super()

    this.state = {
      version: {},
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
  }

  render() {
    const {
      version,
    } = this.state

    return (
      <div>
        <AdminVersion
          {...version}
        />
      </div>
    )
  }
}

export default Admin
