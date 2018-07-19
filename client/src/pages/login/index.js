import React, { Component } from 'react'
import { Grid, Form, Button, Message } from 'semantic-ui-react'
import { apiKey } from '../_shared/constants'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      loginSuccess: false,
      loginFailure: false,
      wrongInputFormat: false,
    }
  }
  handleEmailChange = (e, { value }) => {
    this.setState({ email: value })
  }
  handlePasswordChange = (e, { value }) => {
    this.setState({ password: value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({loginFailure: false, wrongInputFormat: false, loginSuccess: false })
    const {
      email,
      password
    } = this.state

    if(email && password) {
      fetch('/vibes/api/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ apiKey, email, password }),
      })
        .then(res => res.json())
        .then(res => {
          if(res.userToken) {
            this.setState({ loginSuccess: true })
          } else {
            this.setState({ loginFailure: true })
          }
        })
    } else {
      this.setState({ wrongInputFormat: true })
    }
  }

  render() {
    return(
      <div>
        <Grid centered columns={4}>
          <Grid.Column style={{marginTop: "17%"}}>
            <Form error={this.state.loginFailure} success={this.state.loginSuccess} onSubmit={this.handleSubmit}>
              <Form.Input placeholder='Email' type="email" onChange={this.handleEmailChange} />
              <Form.Input placeholder='Password' type="password" onChange={this.handlePasswordChange} />
              <br />
              <Message success header='Logged In' />
              <Message error header='Wrong credentials' />
              {this.state.wrongInputFormat ?
                <Message negative>
                  <Message.Header>All Inputs must be filled</Message.Header>
                </Message>
                : null
              }
              <Button content="Login" type="submit" color="teal" style={{borderRadius: "60px"}} fluid/>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login
