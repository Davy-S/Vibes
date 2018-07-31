import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Menu, Input, Form, Search } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import AuthService from './AuthService'
import { apiKey } from '../_shared/constants'

class Navbar extends Component {
  constructor() {
    super()

    this.Auth = new AuthService()

    this.state = {
      logOut : false,
      isLoading: false,
      searchValue: '',
      results: [],
      user: '',
      profileId: '',
      redirect: false,
      userAdmin: false,
      searchResult: false,
      userId: this.Auth.getUserIdToken(),
    }
  }

  componentWillMount() {
    const {
      userId
    } = this.state

    fetch('/vibes/api/getAllUsers', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({apiKey, _id: userId})
    })
    .then(res => res.json())
    .then(res => {
      if(res.users[0].role === 1) {
        this.setState({userAdmin: true})
      } else {
        this.setState({userAdmin: false})
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const profileId = this.state.user.users[0]._id
    this.setState({profileId, redirect: true})

  }

  handleChange = (e, {value, name}) => {
    this.setState({[name]: value, isLoading: true })

    const {
      searchValue,
      results,
      searchResult
    } = this.state

    if(this.state.searchValue < 2 && searchResult) {
      this.setState({searchResult: false})
    }

    if(this.state.searchValue.length > 3 && !searchResult) {
      fetch('/vibes/api/getProfiles', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({apiKey, nameContaining: searchValue})
      })
      .then(res => res.json())
      .then(res => this.setState({searchValue: res.users[0].fullName, user: res, isLoading: false, searchResult: true}))
    }
  }

  handleLogout = () => {
    this.Auth.logout()
    this.setState({logOut: true})
  }

  render() {
    if(this.state.redirect) {
      this.setState({redirect: false})
      return <Redirect to={`/profile/${this.state.profileId}`} />
    }
    return(
      <Menu secondary fixed="top" inverted style={{paddingTop: "2%", paddingLeft: "6%", paddingRight: "3%"}}>
        <Menu.Item name="home" as={Link} to={`/profile/${this.state.userId}`} />
        <Menu.Item name="messages" as={Link} to="/messages" />
      {this.state.userAdmin ?
        <Menu.Item name="admin" as={Link} to="/admin" />
        : null
      }<Form onSubmit={this.handleSubmit}>
        <Input onChange={this.handleChange} name="searchValue" value={this.state.searchValue} placeholder="Search Friend..."/>
      </Form>
        <Menu.Menu position='right'>
          <Menu.Item name='logout' onClick={this.handleLogout} />
        </Menu.Menu>
        {this.state.logOut ? <Redirect to="/login" /> : null}
      </Menu>
    )
  }
}

export default Navbar
