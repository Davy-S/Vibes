import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Input, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import AuthService from './AuthService'
import { apiKey } from '../_shared/constants'

class Navbar extends Component {
  constructor() {
    super()

    this.Auth = new AuthService()

    this.state = {
      logOut : false,
      search: '',
      userAdmin: false,
      checkRole: this.Auth.getUserIdToken(),
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
      }
    })
  }

  handleChange = (e, {value, name}) => {
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault()


  }

  handleLogout = () => {
    this.Auth.logout()
    this.setState({logOut: true})
  }

  render() {
    return(
      <Menu secondary fixed="top" inverted style={{paddingTop: "2%", paddingLeft: "3%", paddingRight: "3%"}}>
        <Menu.Item name="home" as={Link} to="/profile" />
        <Menu.Item name="messages" as={Link} to="/messages" />
      {this.state.userAdmin ?
        <Menu.Item name="admin" as={Link} to="/admin" />
        : null
      }
        <Menu.Menu position='right'>
          <Menu.Item>
            <Form onSubmit={this.handleSubmit}>
              <Input icon="search" value={this.state.search} name="search" onChange={this.handleChange} placeholder="Search..."
              />
            </Form>
          </Menu.Item>
          <Menu.Item name='logout' onClick={this.handleLogout} />
        </Menu.Menu>
        {this.state.logOut ? <Redirect to="/login" /> : null}
      </Menu>
    )
  }
}

export default Navbar
