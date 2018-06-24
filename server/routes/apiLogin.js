const express = require('express')
const router = express.Router()
const app = express()

router.post('/', (req, res) => {
  res.send(`eh kikoo c'est le login`)
})

module.exports = router
