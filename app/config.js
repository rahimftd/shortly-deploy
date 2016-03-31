var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/shortlydb');

var db = mongoose.connection;

db.once('open', function() {
  var urlSchema = new Schema({
    url: String,
    baseUrl: String,
    code: String,
    title: String,
    visits: Number
  });

  var userSchema = new Schema({
    username: String,
    password: String
  });

});

module.exports = { userSchema: userSchema, urlSchema: urlSchema };
