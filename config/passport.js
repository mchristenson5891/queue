var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/User')


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(process.env.GITHUB_CLIENT_ID)
    User.findOrCreate({ 'githubId': profile.id }, {fullName: profile.displayName}, function(err, user) {
        console.log(user)
        return cb(err, user);
    });
  }
));

 passport.serializeUser(function(user, done) {
     done(null, user.id);
 });

 passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
 });

