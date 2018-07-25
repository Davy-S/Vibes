const express = require('express')
const router = express.Router()
const app = express()
const User = require('../model/Users')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    _id,
    firstName,
    lastName,
    description,
    birthDate,
    city,
  } = req.body

  if(API_KEY !== apiKey) {
    res.status(400)
    res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }

  if(API_KEY === apiKey) {
    if(_id) {
      User.findOneAndUpdate({_id},
        {$set: {firstName: firstName, lastName: lastName, birthDate: birthDate, city: city, description: description}},
        (err, user) => {
          if(err) {
            res.status(400)
            res.json({code: "VIBES_UPDATE_KO", message: "User does not exist"})
          } else {
            res.status(200)
            res.json({code: "VIBES_UPDATE_OK", message: "USER_UPDATED"})
          }
        })
    } else {
      res.status(400)
      res.json({code: "VIBES_UPDATE_KO", message: "id is required"})
    }
  }

  const handleError = (e) => {
    res.status(400)
    res.json({code: "VIBES_UPDATE_KO", message: "Update KO"})
    console.log(e)
  }
})

module.exports = router
