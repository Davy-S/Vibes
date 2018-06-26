const mongoose = require('mongoose')

const getAllUsersSchema = mongoose.Schema({
}, {collection: 'users'})

module.exports = mongoose.model('GetAllUsers', getAllUsersSchema)
