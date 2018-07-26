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
      Users.update({_id: userId}, {$pull: {pendingMatches: requestedId}}, (err) => {
        if(err) {
          res.status(400)
          res.json({code: "VIBES_FRIEND_REJECT_KO", message: "L'utilisateur n'existe pas"})
        } else {
          Users.update({_id: requestedId}, {$pull: {pendingMatches: userId}}, (err) => {
            if(err) {
              res.status(400)
              res.json({code: "VIBES_FRIEND_REJECT_KO", message: "L'utilisateur n'existe pas"})
            } else {
              res.status(200)
              res.json({code: "VIBES_FRIEND_REJECT_OK", message: "Demande d'ami rejetée"})
            }
          })
        }
      })
    } else {
      res.status(400)
      res.json({code: "VIBES_NOT_AVAILABLE", message: "Requete incomplète"})
    }
  }
})

module.exports = router
