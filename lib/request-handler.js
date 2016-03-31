var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find(function(error, links) {
    res.send(200, links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.find({ url: uri }, function(err, links) {
    if (err) { 
      console.log('Error querying database: ', err);
      return res.send(404);
    }
    if (links.length > 0) {
      res.send(200, links[0]);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);   
        }
        var newLink = new Link({
          url: uri,
          baseUrl: req.headers.origin,
          title: title
        });
        newLink.initialize(function(newLink) {
          res.send(200, newLink);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({ username: username }, function(error, users) {
    if (error) {
      console.log('Error querying databse on login', error);
    }
    if (users.length === 0) {
      res.redirect('/login');
    } else {
      users[0].comparePassword(password)
        .then(function(isMatch) {
          if (isMatch) {
            util.createSession(req, res, users[0].username);
          } else {
            res.redirect('/login');
          }
        });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.find({ username: username }, function(error, users) {
    if (error) {
      console.log('User not found', error);
    }
    if (users.length > 0) {
      console.log('Account already exists'); //TODO: UI login interstitial
      res.redirect('/signup');
    } else {
      var newUser = new User({ username: username });
      newUser.initialize(password);
      util.createSession(req, res, newUser.username);
    }
  });
};

exports.navToLink = function(req, res) {
  Link.find({ code: req.params[0] }, function(err, link) {
    if (link.length === 0) {
      res.redirect('/');
    } else {
      link[0].visits = ++link[0].visits;
      link[0].save(function(error, link) {
        res.redirect(link.url);
      });
    }
  });
};









