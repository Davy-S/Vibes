const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  fullName: {type: String, required: true},
  password: {type: String, required: true},
  birthDate: {type: Date},
  interestedIn: {type: String},
  city: {type: String},
  gender: {type: String},
  description: {type: String},
  bands: {type: String},
  matches: [],
  pendingMatches: [],
  conversations: [],
  role: {type: Number, required: true},
}, {collection: 'users'})

module.exports = mongoose.model('Users', UsersSchema)
