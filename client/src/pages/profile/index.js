import React, { Component } from 'react'
import { Button, Grid, Container } from 'semantic-ui-react'
import AuthService from '../_components/AuthService'
import { apiKey } from '../_shared/constants'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
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
    const {
      user,
    } = this.state

    return(
      <div>
        <Grid textAlign="center" columns={4} >
          <Grid.Row>
            <Grid.Column floated="right" style={{marginTop: "2%", marginRight: "15px"}}>
              <Button onClick={this.handleLogout} color="teal" content ="Logout" fluid style={{borderRadius: "60px"}}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
          {user ?
          <Grid columns={4} style={{marginTop: "5%", marginLeft: "2%"}}>

            <Grid.Row>
              <Grid.Column floated="left" >
                <img src={require('../_shared/img/jpp.jpg')} alt="profile picture"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                <h1 style={{color: 'white'}}>{user.users[0].firstName} {user.users[0].lastName}</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                <h3 style={{color: 'white'}}>Age: </h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" >
                  <h3 style={{color: 'white'}}>City: {user.users[0].city}</h3>
              </Grid.Column>
            </Grid.Row>
          </Grid>
            :null
          }
      </div>
    )
  }
  }

export default Profile
