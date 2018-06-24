const express = require('express')
const router = express.Router()
const app = express()
const interestsModel = require('../model/Interests')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    interests = '',
  } = req.body

  if(API_KEY !== apiKey) {
    res.status(400)
    res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }

  if(API_KEY === apiKey) {
    interestsModel.find({}, (err, interests) => {
      if(interests.length) {
        res.status(200)
        res.json({interests})
      } else {
        res.status(400)
        res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
      }
    })
  }
})

module.exports = router
