const mongoose = require('mongoose')

const MusicGenresSchema = mongoose.Schema({
}, {collection: 'musicGenres'})

module.exports = mongoose.model('MusicGenres', MusicGenresSchema)
