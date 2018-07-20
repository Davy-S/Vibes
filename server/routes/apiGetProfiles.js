const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const app = express()
const GetProfiles = require('../model/GetProfiles')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    userId,
    userToken,
    profileId,
    nameContaining,
   } = req.body

  if(API_KEY !== apiKey) {
   res.status(400)
   res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }

  if(API_KEY === apiKey) {
    GetProfiles.find({fullName : {$regex : `.${nameContaining}.`}}, (err, users) => {
      if(!err) {
        res.status(200)
        res.json({users})
      } else {
        res.status(400)
        res.json({code: "VIBES_NOT_AVAILABLE", message: "Une opération de maintenance est en cours. Veuillez nous excuser pour la gêne occasionnée, on revient vite!"})
      }
    })
  }
})

module.exports = router
