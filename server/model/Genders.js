const mongoose = require('mongoose')

const GendersSchema = mongoose.Schema({

}, {collection: 'genders'})

module.exports = mongoose.model('Genders', GendersSchema)
