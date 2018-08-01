module.exports = (io) => {
  let messages = []
  io.on('connection', (socket) => {

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
