var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = mongoose.model('User')

router.get('/', function (req, res, next) {
  res.json({ message: 'This is the root of API' })
})

router.post('/users', function (req, res, next) {
  var user = new User()

  user.name = req.body.name
  user.username = req.body.username
  user.password = req.body.password

  user.save(function (err) {
    if (err) {
      // Does the username already exist?
      if (err.code === 11000) {
        return res.status(409).json(
          { success: false, error: 'Username already exists!' }
        )
      }
      // Are any required keys missing?
      if (err.name === 'ValidationError') {
        return res.status(403).json({success: false, error: err})
      }
      return res.json(err)
    }

    res.json({ message: 'User successfully created!' })
  })
})

module.exports = router
