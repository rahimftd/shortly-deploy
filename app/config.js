var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/shortlydb');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

// db.once('open', function() {
//   var urlSchema = new Schema({
//     url: String,
//     baseUrl: String,
//     code: String,
//     title: String,
//     visits: Number
//   });

//   var userSchema = new Schema({
//     username: String,
//     password: String
//   });

//   var User = mongoose.model('User', userSchema);

//   var newUser = new User({username: 'rahim'});

//   module.exports = { userSchema: userSchema, urlSchema: urlSchema };
// });

