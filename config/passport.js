
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User')

passport.use(new GitHubStrategy({
    clientID:  process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'googleId': profile.id }, function(err, student) {
      if (err) return cb(err);
      if (student) {
        return cb(null, student);
      } else {
        // we have a new student via OAuth!
        console.log(profile)
        var newUser = new User({
          fullName: profile.username,
          githubId: profile.id
        });
        console.log(newUser)
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  }
));


 passport.serializeUser(function(student, done) {
     done(null, student.id);
 });


 passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, student) {
     done(err, student);
   });
 });

