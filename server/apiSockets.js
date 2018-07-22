module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('disconnect', () => {
      console.log('a user disconnected')
    })
    socket.on('usersUpdated', () => {
      socket.emit('fetchGetAllUsers')
    })
  })
}
