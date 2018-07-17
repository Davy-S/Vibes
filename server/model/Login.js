const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
}, {collection: 'users'})

LoginSchema.statics.authenticate = (email, password, callback) {
  Login.findOne({email})
    .exec((err, user) {
      if (err) {
        return callback(err)
      } else if (!user){
        const err = new Error('User not found')
        err.status = 401
        return callback(err)
      }
      bcrypt.compare(password, user.password, (err, result) {
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      })
    })
}

module.exports = mongoose.model('Login', LoginSchema)
