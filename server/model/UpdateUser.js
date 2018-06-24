const mongoose = require('mongoose')

const updateUserSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
  lastName: {type: String},
  firstName: {type: String},
  birthDate: {type: Date},
  city: {type: String},
}, {collection: 'users'})

module.exports = mongoose.model('UpdateUser', updateUserSchema, 'users')
