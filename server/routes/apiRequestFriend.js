const express = require('express')
const router = express.Router()
const app = express()
const Users = require('../model/Users')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    userToken,
    userId,
    requestedId,
  } = req.body

  if(API_KEY !== apiKey) {
    res.status(400)
    res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }

  if(API_KEY === apiKey) {
    if(userId && requestedId) {
      Users.findOneAndUpdate({_id: requestedId}, {$addToSet: {pendingMatches: userId}}, (err) => {
        if(err) {
          res.status(400)
          res.json({code: "VIBES_FRIEND_REQUEST_KO", message: "L'utilisateur n'existe pas"})
        } else {
          res.status(200)
          res.json({code: "VIBES_FRIEND_REQUEST_OK", message: "Requete d'ami envoyée"})
        }
      })
    } else {
      res.status(400)
      res.json({code: "VIBES_NOT_AVAILABLE", message: "Requete incomplète"})
    }
  }
})

module.exports = router
