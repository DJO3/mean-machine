var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = mongoose.model('User')

// get root
router.get('/', function (req, res, next) {
  res.json({ message: 'This is the root of API' })
})

// post new user
router.post('/users', function (req, res, next) {
  var user = new User()

  user.name = req.body.name
  user.username = req.body.username
  user.password = req.body.password

  user.save(function (err) {
    if (err) {
      return next(err)
    }

    res.json({ message: 'User successfully created!' })
  })
})

// get all users
router.get('/users', function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(err)
    }

    res.json(users)
  })
})

// get a user
router.get('/users/:user_id', function (req, res, next) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      return next(err)
    }

    res.json(user)
  })
})

module.exports = router
