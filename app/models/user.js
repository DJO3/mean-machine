var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new mongoose.Schema({
  name: String,
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false}
})

// hash the password before saving
UserSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) {
      return next(err)
    }

    user.password = hash
    next()
  })
})

// compare given password with db hash
UserSchema.methods.comparePassword = function (password) {
  var user = this
  return bcrypt.compareSync(password, user.password)
}

mongoose.model('User', UserSchema)
