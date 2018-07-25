import React, { Component } from 'react'
import { Button, Grid, Menu, Input, Modal, Header, Form, Message } from 'semantic-ui-react'
import moment from 'moment'
import AuthService from '../_components/AuthService'
import { apiKey } from '../_shared/constants'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
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

  componentWillMount(){
    if(!this.Auth.loggedIn()) {
      this.props.history.replace('/login')
    } else {
      this.fetchUserData()
    }
  }

  fetchUserData = () => {
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

  handleChange = (e, { value }) => {
    this.setState({
      [e.target.name]: value
    })
  }

  handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login')
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

    return(
      <div>
        <Menu secondary fixed="top" inverted style={{paddingTop: "2%", paddingLeft: "3%", paddingRight: "3%"}}>
          <Menu.Item name='home' />
          <Menu.Item
            name='messages'
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
              name='logout'
              onClick={this.handleLogout}
            />
          </Menu.Menu>
        </Menu>
          {user ?
          <div>
            <Grid columns={4} style={{paddingTop: "11%", paddingLeft: "2%"}}>
              <Grid.Row>
                <Grid.Column floated="left" >
                  <img src={require('../_shared/img/jpp.jpg')} alt="profile"/>
                </Grid.Column>
                <Grid.Column  textAlign="center">
                  <h1>Friends: {user.users[0].matches.length}</h1>
                </Grid.Column>
                <Grid.Column textAlign="center" floated="right">
                  <h1>Pending Invitations: {user.users[0].pendingMatches.length}</h1>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button content="Edit Profile"  color="teal" onClick={this.handleEditProfileClick} style={{borderRadius: "60px"}} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column floated="left" >
                  <h1 style={{color: 'white'}}>{user.users[0].firstName} {user.users[0].lastName}</h1>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column floated="left" >
                  <h3 style={{color: 'white'}}>BirthDate: {moment(user.users[0].birthDate).format('DD/MM/YYYY')}</h3>
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
                    label='BirthDate'
                    name="birthDate"
                    type="date"
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
