import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'
import { ChatFeed, Message } from 'react-chat-ui'
import ScrollToBottom from 'react-scroll-to-bottom';
import { Grid, List, Image, Container, Segment, Card, Input, Form } from 'semantic-ui-react'
import { apiKey } from '../_shared/constants'
import AuthService from '../_components/AuthService'
import socket from '../_shared/sockets'

import Chat from './Chat'

const ROOT_CSS = css({
  height: '450px',
  overflow: 'auto',
  backgroundColor: 'rgba(216, 216, 216, 0.4)',
  borderRadius: '20px',
  padding: '0 20px',
  margin: 'auto',
  width: '45%'
})

class Messages extends Component {
  constructor() {
    super()

    this.Auth = new AuthService()

    this.state = {
      value: '',
      _id: this.Auth.getUserIdToken(),
      myName: '',
      messages: [],
    }
  }

  componentDidMount() {
    socket.on('newMessage', (messages) => {
      console.log("back", messages)
      this.setState({messages})
    })
    socket.on('sendChatHistory', (messages) => {
      this.setState({messages})
    })
  }

  componentWillMount() {
    socket.emit('getMessages')

    const { _id } = this.state
    fetch('/vibes/api/getAllUsers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({apiKey, _id})
    })
    .then(res => res.json())
    .then(res => this.setState({myName: res.users[0].fullName}))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state._id, this.state.value, this.state.myName)
    const message = new Message({id: this.state._id, message: this.state.value, senderName: this.state.myName})
    console.log('front', message)
    socket.emit('sendChatMessage', message)

    this.setState({value: ''})
  }

  handleChange = (e, { value }) => {
    this.setState({
      [e.target.name]: value
    })
  }

  render() {
    return(
      <div>
        <Grid columns={4} style={{paddingTop: "12%"}}>
          <Grid.Row>
            <ScrollToBottom className={ ROOT_CSS } >
              <ChatFeed
                messages={this.state.messages} // Boolean: list of message objects
                maxHeight="150"
                isTyping={this.state.is_typing} // Boolean: is the recipient typing
                hasInputField={false} // Boolean: use our input, or use your own
                showSenderName // show the name of the user who sent the message
                bubblesCentered //Boolean should the bubbles be centered in the feed?
                // JSON: Custom bubble styles
                bubbleStyles={
                  {
                    text: {
                      fontSize: 15
                    },
                    chatbubble: {
                      borderRadius: 23,
                      padding: 15
                    }
                  }
                }
              />
            </ScrollToBottom>
          </Grid.Row>
          <Grid.Row>
            <Container textAlign="center" text>
              <Form onSubmit={this.handleSubmit} >
                <Input name="value" value={this.state.value} onChange={this.handleChange} placeholder="Send message" />
              </Form>
            </Container>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Messages
