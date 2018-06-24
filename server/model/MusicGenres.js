const mongoose = require('mongoose')

const MusicGenresSchema = mongoose.Schema({
  _id: { type: Number },
}, {collection: 'musicGenres'})

module.exports = mongoose.model('MusicGenres', MusicGenresSchema)
