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
    } else if (!user) {
      return res.status(404).json({ error: 'User not found!' })
    }

    res.json(user)
  })
})

// update a user
router.put('/users/:user_id', function (req, res, next) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      return next(err)
    } else if (!user) {
      return res.status(404).json({ error: 'User not found!' })
    }

    if (req.body.name) {
      user.name = req.body.name
    }
    if (req.body.username) {
      user.username = req.body.username
    }
    if (req.body.password) {
      user.password = req.body.password
    }

    user.save(function (err) {
      if (err) {
        return next(err)
      }

      res.json({ message: 'User information successfully updated!' })
    })
  })
})

// delete a user
router.delete('/users/:user_id', function (req, res, next) {
  var deleteUser = { _id: req.params.user_id }
  User.remove(deleteUser, function (err, user) {
    if (err) {
      return next(err)
    } else if (!user) {
      return res.status(404).json({ error: 'User not found!' })
    }

    res.json({ message: 'User successfully deleted' })
  })
})

module.exports = router
