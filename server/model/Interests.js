const mongoose = require('mongoose')

const InterestsSchema = mongoose.Schema({

}, {collection: 'interests'})

module.exports = mongoose.model('Interests', InterestsSchema)
