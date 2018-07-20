const mongoose = require('mongoose')

const GendersSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
}, {collection: 'genders'})

module.exports = mongoose.model('Genders', GendersSchema)
