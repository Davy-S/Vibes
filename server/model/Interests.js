const mongoose = require('mongoose')

const InterestsSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
}, {collection: 'interests'})

module.exports = mongoose.model('Interests', InterestsSchema)
