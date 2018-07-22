const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number
  },
}, {collection: 'users'})

module.exports = mongoose.model('Login', LoginSchema)
