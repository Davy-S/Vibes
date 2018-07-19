import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Grid, Message } from 'semantic-ui-react'
import { apiKey } from '../_shared/constants'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      registerSuccess: false,
      registerFailure: false,
      wrongInputFormat: false,
    }
  }

  handleChange = (e, { value }) => {
    this.setState({
      [e.target.name]: value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({registerFailure: false, registerSuccess: false, wrongInputFormat: false })
    const {
      email,
      firstName,
      lastName,
      password,
    } = this.state

    if(email && password && lastName && password) {
      fetch('/vibes/api/createProfile', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ apiKey, email, firstName, lastName, password })
      })
        .then(res => res.json())
        .then(res => {
          if(res.code === "VIBES_CREATION_OK") {
            this.setState({ registerSuccess: true })
          } else {
            this.setState({ registerFailure: true })
          }
        })
    } else {
      this.setState({ wrongInputFormat: true })
    }
  }

  render() {
    return(
      <div>
        <Grid textAlign="center" columns={4}>
          <Grid.Row>
            <Grid.Column floated="right" style={{marginTop: "2%", marginRight: "15px"}}>
              <Button as={Link} to="/login" color="teal" content="Connexion" style={{borderRadius: "60px"}} fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{marginTop: "9%"}}>
              <Form error={this.state.registerFailure} success={this.state.registerSuccess} onSubmit={this.handleSubmit} >
                <Form.Input placeholder='Email' name="email" type="email" onChange={this.handleEmailChange} />
                <Form.Input placeholder='Prénom' name="firstName" onChange={this.handlefirstNameChange} />
                <Form.Input placeholder='Nom' name="lastName" onChange={this.handleLastNameChange} />
                <Form.Input placeholder='Mot de passe' name="password" type="password" onChange={this.handlePasswordChange} />
                <br />
                <Message success header='Account created' />
                <Message error header='Email already taken' />
                {this.state.wrongInputFormat ?
                  <Message negative>
                    <Message.Header>All Inputs must be filled</Message.Header>
                  </Message>
                  : null
                }
                <Button content="Inscription" type="submit" color="teal" fluid style={{borderRadius: "60px"}}/>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Home
