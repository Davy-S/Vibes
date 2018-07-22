const mongoose = require('mongoose')

const getProfilesSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
}, {collection: 'users'})

module.exports = mongoose.model('GetProfiles', getProfilesSchema)
