import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Admin from './pages/admin'

class App extends Component {
  render() {
    return (
      <div>
        <br />
        <Container>
          <Admin />
        </Container>
      </div>
    )
  }
}

export default App
