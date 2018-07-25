const express = require('express')
const router = express.Router()
const app = express()
const Genders = require('../model/Genders')
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
      Genders.find({}, (err, genders) => {
        if(genders.length) {
          res.status(200)
          res.json({genders})
        } else {
          res.status(400)
          res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
        }
      })
    }
    if(_id) {
      Genders.find({_id}, (err, genders) => {
        if(genders.length) {
          res.status(200)
          res.json({genders})
        } else {
          res.status(400)
          res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
        }
      })
    }
  }
})

module.exports = router
