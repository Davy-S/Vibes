import React, { Component } from 'react'
import { Grid, Form, Button, Message } from 'semantic-ui-react'
import { apiKey } from '../_shared/constants'
import AuthService from '../_components/AuthService'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      loginFailure: false,
      wrongInputFormat: false,
    }
    this.Auth = new AuthService()
  }

  componentWillMount(){
    if(this.Auth.loggedIn()) {
      this.setState({ loginSuccess: true })
    }
  }

  handleChange = (e, { value }) => {
    this.setState({
      [e.target.name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({loginFailure: false, wrongInputFormat: false })
    const {
      email,
      password
    } = this.state

    if(email && password) {
      this.Auth.login(apiKey, email, password)
        .then(res =>{
           console.log(res)
           this.props.history.replace('/profile')
        })
        .catch(err =>{
          console.log(err)
          this.setState({ loginFailure: true })
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
              <Form.Input placeholder='Email' name="email" type="email" onChange={this.handleChange} />
              <Form.Input placeholder='Password' name="password" type="password" onChange={this.handleChange} />
              <Message error header='Wrong credentials' />
              {this.state.wrongInputFormat ?
                <Message negative>
                  <Message.Header>All Inputs must be filled</Message.Header>
                </Message>
                : null
              }
              <br />
              <Button content="Login" type="submit" color="teal" style={{borderRadius: "60px"}} fluid/>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login
