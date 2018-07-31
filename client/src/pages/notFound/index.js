import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'

class NotFound extends Component {
  render() {
    return(
      <div>
        <Grid columns={1} style={{paddingTop: "13%", paddingLeft: "2%"}}>
          <Grid.Row>
            <Grid.Column textAlign="center" >
              <Container text>
                <h1>Page Not Found (404)</h1>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default NotFound
