var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-find-or-create');
var User = require('./../models/User');

passport.use(new GitHubStrategy({
    clientID: 'cd51577bbc5831a29677',
    clientSecret: 'bdb0ff1556beb9bfc9a716b9e1c0a70767a8c740',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("in")
  }
));



