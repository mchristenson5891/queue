var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-find-or-create');
var User = require('./../models/User');

passport.use(new GitHubStrategy({

  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("in")
  }
));



