var mongoose = require('mongoose');
var userSchema = require('../config').userSchema;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

userSchema.methods.initialize = function(username, password) {
  //new User({ username: username, password: password})
};
userSchema.methods.comparePassword = function(attemptedPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

//hashPassword

var User = mongoose.model('User', userSchema);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

module.exports = User;
