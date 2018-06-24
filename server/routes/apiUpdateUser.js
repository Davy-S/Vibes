const express = require('express')
const router = express.Router()
const app = express()
const updateUser = require('../model/UpdateUser')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    userId,
    firstName,
    lastName,
    birthDate,
    city,
  } = req.body

  if(API_KEY !== apiKey) {
    res.status(400)
    res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }

  if(API_KEY === apiKey) {
    updateUser.find({userId}, (err, user) => {
      if(user.length === 1) {
        user.userId = userId
        user.firstName = firstName
        user.lastName = lastName
        user.birthDate = birthDate
        user.city = city

        user.save((err) => {
          err ? handleError(err) :
          res.status(200)
          res.json({code: "VIBES_UPDATE_OK", message: "USER_UPDATED"})
        })
      }
      if(!user.length) {
        res.status(400)
        res.json({code: "VIBES_UPDATE_KO", message: "User does not exist"})
      }
    })
  }

  const handleError = (e) => {
    res.status(400)
    res.json({code: "VIBES_UPDATE_KO", message: "Update KO"})
    console.log(e)
  }
})

module.exports = router
