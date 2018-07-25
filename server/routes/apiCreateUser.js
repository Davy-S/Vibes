const express = require('express')
const router = express.Router()
const app = express()
const bcrypt = require('bcrypt')
const User = require('../model/Users')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    lastName,
    firstName,
    email,
    password
    } = req.body

  if(API_KEY !== apiKey) {
    res.status(400)
    res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }

  if(API_KEY === apiKey) {
    const fullName = `${firstName} ${lastName}`
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err)
      }

      const newUser = new User({
        email,
        firstName,
        lastName,
        fullName,
        password: hash,
        interestedIn: '',
        city: '',
        gender: '',
        description: '',
        bands: '',
        role: 2,
      })

      User.find({email}, (err, docs) => {
        if(!docs.length) {
          newUser.save((err) => {
            err ? handleError(err) :
            res.status(200)
            res.json({code: "VIBES_CREATION_OK", message: "USER_CREATED"})
          })
        } else {
          res.status(400)
          res.json({code: "VIBES_USER_ALREADY_EXISTS", message: "User already exists"})
        }
      })
    })
  }

  const handleError = (e) => {
    res.status(400)
    res.json({code: "VIBES_CREATION_KO", message: "Creation KO"})
    console.log(e)
  }
})

module.exports = router
