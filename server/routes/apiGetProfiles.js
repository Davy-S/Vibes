const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const app = express()
const Users = require('../model/Users')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const {
    apiKey,
    nameContaining,
   } = req.body

  if(API_KEY !== apiKey) {
   res.status(400)
   res.json({code: "VIBES_BAD_API_KEY", message: "Bad API key"})
  }

  if(API_KEY === apiKey) {
    let regex = new RegExp([".*", nameContaining, "*."].join(""), "i")
    // GetProfiles.find({$or : [{firstName : {$regex : regex}}, {lastName: {$regex : regex}}] }, (err, users) => {
    Users.find({fullName : {$regex : regex}}, (err, users) => {
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
