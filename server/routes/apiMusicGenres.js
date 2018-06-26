const express = require('express')
const router = express.Router()
const app = express()
const musicGenres = require('../model/MusicGenres')
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
      musicGenres.find({}, (err, musicGenres) => {
        if(musicGenres) {
          res.status(200)
          res.json({musicGenres})
        } else {
          res.status(400)
          res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
        }
      })
    }

    if(_id) {
      musicGenres.find({_id}, (err, musicGenres) => {
        if(musicGenres) {
          res.status(200)
          res.json({musicGenres})
        } else {
          res.status(400)
          res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
        }
      })
    }

  }
})

module.exports = router
