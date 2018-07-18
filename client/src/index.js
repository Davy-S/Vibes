import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'

class Vibes extends Component {
  render() {
    return(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Vibes />, document.getElementById('root'))
