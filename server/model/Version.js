const mongoose = require('mongoose')

const VersionSchema = mongoose.Schema({
  availableVersion: Number,
  requiredVersion: Number,
  isMaintenance: Number,
  appMessage: String,
}, { collection: 'version'})

module.exports = mongoose.model('Version', VersionSchema)
