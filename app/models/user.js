var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

userSchema.methods.initialize = function(plainTextPassword) {
  this.hashPassword(plainTextPassword)
    .then(function(hash) {
      this.password = hash;
      this.save();
    });
};

userSchema.methods.comparePassword = function(attemptedPassword) {
  var that = this;
  return new Promise(function(resolve, reject) {
    bcrypt.compare(attemptedPassword, that.password, function(err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

userSchema.methods.hashPassword = function(plainTextPassword) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(plainTextPassword, null, null).bind(this);
};

var User = mongoose.model('User', userSchema);
module.exports = User;
