const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const createUserSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
  lastName: {type: String, required: true},
  firstName: {type: String, required: true},
  fullName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
}, {collection: 'users'})

module.exports = mongoose.model('CreateUser', createUserSchema)
