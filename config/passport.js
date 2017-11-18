var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-find-or-create');
var User = require('./../models/User');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("in")
  }
));



