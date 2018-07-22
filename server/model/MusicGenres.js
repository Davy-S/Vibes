const mongoose = require('mongoose')

const MusicGenresSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
}, {collection: 'musicGenres'})

module.exports = mongoose.model('MusicGenres', MusicGenresSchema)
