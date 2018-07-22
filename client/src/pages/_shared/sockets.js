import openSocket from 'socket.io-client'
const options = {
  rejectUnauthorized: false // allow self-signed certs
}
const socket = openSocket('http://localhost:5000', options)

export default socket
