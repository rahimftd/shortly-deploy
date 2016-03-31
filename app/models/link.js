var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var Promise = require('bluebird');

var linkSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

linkSchema.methods.initialize = function(callback) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  this.visits = 0;
  this.save(function(err, newLink) {
    callback(newLink);
  });
};

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
