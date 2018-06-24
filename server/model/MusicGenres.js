const mongoose = require('mongoose')

const MusicGenresSchema = mongoose.Schema({

}, {collection: 'MusicGenres'})

module.exports = mongoose.model('MusicGenres', MusicGenresSchema)
