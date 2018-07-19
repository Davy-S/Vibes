import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Grid, Message } from 'semantic-ui-react'
import { apiKey } from '../_shared/constants'

class Home extends Component {
  render() {
    return(
      <div>
        <Grid textAlign="center" columns={4}>
          <Grid.Row>
            <Grid.Column floated="right" style={{marginTop: "3%", marginRight: "15px"}}>
              <Button as={Link} to="/login" color="teal" content="Connexion" fluid style={{borderRadius: "60px"}} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{marginTop: "10%"}}>
              <Form >
                <Form.Input placeholder='Email' type="email" />
                <Form.Input placeholder='Nom' />
                <Form.Input placeholder='Prénom' />
                <Form.Input placeholder='Mot de passe' type="password" />
                <br />
                <Message error header='Wrong credentials' />
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
