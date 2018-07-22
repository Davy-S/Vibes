import openSocket from 'socket.io-client'
const options = {
  rejectUnauthorized: false // allow self-signed certs
}
const socket = openSocket('https://vibes-app.herokuapp.com', options)

export default socket
