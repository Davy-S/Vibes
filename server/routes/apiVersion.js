const express = require('express')
const router = express.Router()
const app = express()
const Version = require('../model/Version')
const { API_KEY } = require('../constants')

router.post('/', (req, res) => {
  const { apiKey } = req.body
  try {
    if(API_KEY === apiKey) {
      Version.find((err, version) => {
        if(err) {
          console.log(err)
        } else {
          res.status(200)
          res.json(version[0])
        }
      })
    } else {
      res.status(400)
      res.json({code : "VIBES_BAD_API_KEY", message : "Bad API key"})
    }
  }
  catch (e) {
    console.error('db error', e)
  }
})

module.exports = router
