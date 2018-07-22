const mongoose = require('mongoose')

const getAllUsersSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
}, {collection: 'users'})

module.exports = mongoose.model('GetAllUsers', getAllUsersSchema)
