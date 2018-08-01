import React from 'react'

const Chat = ({messages}) => (
  <div>
    {messages.map(el => (
      <div>
        <b>{el.name}</b>
        <p>{el.message}</p><br />
      </div>
    )
    )}
  </div>
)

export default Chat
