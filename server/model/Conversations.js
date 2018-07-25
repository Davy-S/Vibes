const mongoose = require('mongoose')

const ConversationsSchema = mongoose.Schema({
  apiKey: {type: String, required: true},

}, {collection: 'conversations'})

module.exports = mongoose.model('Conversations', ConversationsSchema)
