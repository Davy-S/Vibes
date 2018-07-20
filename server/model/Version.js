const mongoose = require('mongoose')

const VersionSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
  availableVersion: Number,
  requiredVersion: Number,
  isMaintenance: Number,
  appMessage: String,
}, { collection: 'version'})

module.exports = mongoose.model('Version', VersionSchema)
