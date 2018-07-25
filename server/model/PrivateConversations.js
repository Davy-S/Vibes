const mongoose = require('mongoose')

const PrivateConversationsSchema = mongoose.Schema({
  apiKey: {type: String, required: true},
  message: {type: String},
  
}, {collection: 'privateConversations'})

module.exports = mongoose.model('PrivateConversations', PrivateConversationsSchema)
