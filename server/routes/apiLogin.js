const express = require('express')
const router = express.Router()
const app = express()
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    email,
    password
   } = req.body

  if(API_KEY === apiKey) {
    Login.authenticate(email, password, (err, user) => {
      if(error || !user) {
        const err = new Error('Wrong email or password')
        err.status = 401
        return next(err)
      } else {
        req.session.userId = user._id
        console.log('logged in')
      }
    })

  } else {
    const err = new Error('All fields required')
    err.status = 400
    return next(err)
  }

})

module.exports = router
