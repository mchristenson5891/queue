var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/User')


passport.use(new GitHubStrategy({
    clientID: "9b8689510f1da6d56dd5",
    clientSecret: "f2ff34bf2c6353033bb1f4cb3f656bc713db0219",
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ 'githubUserName': profile.username }, {githubUserName: profile.username}, function(err, user) {
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
