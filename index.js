require('babel-polyfill')
const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const jwt = require('jsonwebtoken')
const exjwt = require('express-jwt')
const port = (process.env.PORT || '5000')
//Sockets
const server = http.createServer(app)
const io = require('socket.io').listen(server)

const apiLogin = require('./server/routes/apiLogin')
const apiVersion = require('./server/routes/apiVersion')
const apiCreateUser = require('./server/routes/apiCreateUser')
const apiUpdateUser = require('./server/routes/apiUpdateUser')
const apiMusicGenres = require('./server/routes/apiMusicGenres')
const apiInterests = require('./server/routes/apiInterests')
const apiGenders = require('./server/routes/apiGenders')
const apiGetAllUsers = require('./server/routes/apiGetAllUsers')
const apiGetProfiles = require('./server/routes/apiGetProfiles')
const apiRequestFriend = require('./server/routes/apiRequestFriend')
const apiAcceptFriend = require('./server/routes/apiAcceptFriend')
const apiRejectFriend = require('./server/routes/apiRejectFriend')
//Sockets
require('./server/apiSockets.js')(io)

//DB URI
const { mongoDB } = require('./server/constants')

// Serve static files from the React app
app.use(express.static(path.join(__dirname + '/client/build')))

//req.body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const jwtMW = exjwt({
  secret: 'JeanPierrePernault'
})

//Routes
app.use('/vibes/api/login', apiLogin)
app.use('/vibes/api/version', apiVersion)
app.use('/vibes/api/createProfile', apiCreateUser)
app.use('/vibes/api/updateProfile', apiUpdateUser)
app.use('/vibes/api/musicGenres', apiMusicGenres)
app.use('/vibes/api/interests', apiInterests)
app.use('/vibes/api/genders', apiGenders)
app.use('/vibes/api/getAllUsers', apiGetAllUsers)
app.use('/vibes/api/getProfiles', apiGetProfiles)
app.use('/vibes/api/requestFriend', apiRequestFriend)
app.use('/vibes/api/acceptFriend', apiAcceptFriend)
app.use('/vibes/api/rejectFriend', apiRejectFriend)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

//DB connect
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//Sockets

//Server
server.listen(port, () => console.log(`connected on port ${port}`))
