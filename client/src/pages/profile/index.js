import React, { Component } from 'react'
import { Button, Grid, Menu, Input, Modal, Header, Form, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AuthService from '../_components/AuthService'
import { apiKey } from '../_shared/constants'

class Profile extends Component {
  constructor() {
    super()

    this.state = {
      user: '',
      pendings: [],
      fetchPendings: false,
      editError: false,
      modalOpenEdit: false,
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      birthDate: '',
      description: '',
    }
    this.Auth = new AuthService()
  }

  fetchPendings = (user) => {
    console.log("user", user);
    let pendings = []
    console.log("id", user.users[0].pendingMatches[0])
      fetch('/vibes/api/getAllUsers', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({apiKey, _id: user.users[0].pendingMatches[0]})
      })
      .then(res => res.json())
      .then(res => console.log(res))
      .then(res => pendings.push({name: res.users[0].fullName, id: res.users[0]._id}))
      .then(this.setState({pendings, fetchPendings: false}))
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match

    fetch('/vibes/api/getAllUsers', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apiKey, _id: params.id}),
    })
    .then(res => res.json())
    .then(user => this.setState({user, fetchPendings: true}))
  }

  componentWillMount() {
    if(!this.Auth.loggedIn()) {
      this.props.history.replace('/login')
    } else {
      this.fetchUserData()
    }
  }

  handleChange = (e, { value }) => {
    this.setState({
      [e.target.name]: value
    })
  }

  fetchUserData = () => {
    const {
      match
    } = this.props
    console.log("kikoo")
    fetch('/vibes/api/getAllUsers', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apiKey, _id: match.params.id}),
    })
    .then(res => res.json())
    .then(user => this.setState({user, fetchPendings: true}))
  }

  handleRequestFriend = () => {
    const userId = this.Auth.getUserIdToken()
    const requestedId = this.state.user.users[0]._id
    fetch('/vibes/api/requestFriend', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({apiKey, userId, requestedId})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(this.fetchUserData())
  }

  handleAcceptFriend = () => {
    const userId = this.Auth.getUserIdToken()
    const requestedId = this.state.user.users[0].pendingMatches[0]

    fetch('/vibes/api/acceptFriend', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({apiKey, userId, requestedId})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(this.fetchUserData())
  }

  handleRejectFriend = () => {
    const userId = this.Auth.getUserIdToken()
    const requestedId = this.state.user.users[0].pendingMatches[0]

    fetch('/vibes/api/rejectFriend', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({apiKey, userId, requestedId})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(this.fetchUserData())
  }

  handleEditProfileClick = () => {
    const {
      user
    } = this.state

    this.setState({
      modalOpenEdit: true,
      firstName: user.users[0].firstName,
      lastName: user.users[0].lastName,
      email: user.users[0].email,
      city: user.users[0].city,
      birthDate: user.users[0].birthDate,
      description: user.users[0].description,
     })
  }

  handleCloseEdit = () => {
    this.setState({modalOpenEdit: false})
  }

  handleSubmitEditUser = (e) => {
    e.preventDefault()
    this.setState({ editError: false })
    const _id = this.Auth.getUserProfile()
    const {
      firstName,
      lastName,
      email,
      city,
      birthDate,
      description,
    } = this.state

    if(apiKey && _id && firstName && lastName && email) {
      fetch('/vibes/api/updateProfile', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ apiKey, _id, firstName, lastName, email, birthDate, city, description }),
      })
        .then(res => res.json())
        .then(this.fetchUserData())
        .then(this.handleCloseEdit)
    } else {
      this.setState({ editError: true })
    }
  }

  render() {
    const {
      user,
    } = this.state
    console.log(user)

    let profileBtn;

    if(this.Auth.getUserIdToken() === this.props.match.params.id) {
      profileBtn = <Button content="Edit Profile" color="teal" onClick={this.handleEditProfileClick} style={{borderRadius: "60px"}} />
    }

    if((this.Auth.getUserIdToken() !== this.props.match.params.id) && !user.users[0].pendingMatches.includes(this.Auth.getUserIdToken())){
      profileBtn = <Button content="Send Friend Request"  color="blue" onClick={this.handleRequestFriend} style={{borderRadius: "60px"}} />
    }

    if((this.Auth.getUserIdToken() !== this.props.match.params.id) && user.users[0].matches.includes(this.Auth.getUserIdToken())) {
      profileBtn = <Button content="Friend"  color="green" style={{borderRadius: "60px"}} />
    }

    if((this.Auth.getUserIdToken() !== this.props.match.params.id) && user.users[0].pendingMatches.includes(this.Auth.getUserIdToken())) {
      profileBtn = <Button content="Friend Request Pending"  color="blue" style={{borderRadius: "60px"}} />
    }

    if((this.Auth.getUserIdToken() !== this.props.match.params.id) && user.users[0].pendingMatches.includes(this.Auth.getUserIdToken())) {
      profileBtn = <Button content="Friend Request Pending"  color="blue" style={{borderRadius: "60px"}} />
    }

    return(
      <div>
        {user ?
        <div>
          <Grid columns={4} style={{paddingTop: "13%", paddingLeft: "2%"}}>
            <Grid.Row>
              <Grid.Column floated="left" >
                <img src={require('../_shared/img/jpp.jpg')} alt="profile"/>
              </Grid.Column>
              <Grid.Column>
                <h1>Friends: {user.users[0].matches.length}</h1><br />
                {(user.users[0].pendingMatches.length !== 0) && (this.Auth.getUserIdToken() === this.props.match.params.id)?
                  <div>
                    <h1>Pending Invitations: {user.users[0].pendingMatches.length}</h1>
                    <p>{user.users[0].pendingMatches[0]}</p>
                    <Button.Group size='large'>
                      <Button onClick={this.handleAcceptFriend}>Accept</Button>
                      <Button.Or />
                      <Button onClick={this.handleRejectFriend}>Decline</Button>
                    </Button.Group>
                  </div>
                  : null
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                {profileBtn}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                <h1 style={{color: 'white'}}>{user.users[0].firstName} {user.users[0].lastName}</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                <h3 style={{color: 'white'}}>Age: {user.users[0].birthDate}</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                  <h3 style={{color: 'white'}}>City: {user.users[0].city}</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                <h3 style={{color: 'white'}}>Description: {user.users[0].description}</h3>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Modal
            open={this.state.modalOpenEdit}
            onClose={this.handleCloseEdit}
            size='small'
          >
            <Header icon='browser' content='Edit User' />
            <Modal.Content>
              <Form error={this.state.editError} onSubmit={this.handleSubmitEditUser}>
                <Form.Input
                  label='First Name'
                  defaultValue={user.users[0].firstName}
                  name="firstName"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Last Name'
                  name="lastName"
                  defaultValue={user.users[0].lastName}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Email'
                  name="email"
                  defaultValue={user.users[0].email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='City'
                  name="city"
                  defaultValue={user.users[0].city}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Age'
                  name="birthDate"
                  defaultValue={user.users[0].birthDate}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Description'
                  name="description"
                  defaultValue={user.users[0].description}
                  onChange={this.handleChange}
                />
                <Message
                  error
                  header='Action Forbidden'
                  content='FirstName LastName and Email must be filled'
                />
                <hr />
                <Button type='submit' color='teal' content='Edit User'/>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
        :null
      }
      </div>
    )
  }
}

export default Profile
