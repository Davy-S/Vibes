module.exports = (io) => {
  io.on('connection', (socket) => {
    let messages = []

    socket.on('getMessages', () => {
      socket.emit('sendChatHistory', messages)
    })

    socket.on('sendChatMessage', (message) => {
      messages.push(message)
      io.emit('newMessage', messages)

    })

    socket.on('usersUpdated', () => {
      socket.emit('fetchGetAllUsers')
    })
  })
}
