const express = require('express')
const router = express.Router()
const app = express()
const getAllUsers = require('../model/GetAllUsers')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    _id,
  } = req.body

  if(API_KEY !== apiKey) {
    res.status(400)
    res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }
  if(API_KEY === apiKey) {
    if(!_id) {
      getAllUsers.find({}, (err, users) => {
        if(users.length) {
          res.status(200)
          res.json({users})
        } else {
          res.status(400)
          res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
        }
      })
    }
    if(_id) {
      getAllUsers.find({_id}, (err, users) => {
        if(users.length) {
          res.status(200)
          res.json({users})
        } else {
          res.status(400)
          res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
        }
      })
    }
  }
})

module.exports = router
