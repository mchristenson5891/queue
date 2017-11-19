var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {
  // a user has logged in with OAuth...
  User.findOne({ 'googleId': profile.id }, function(err, user) {
    if (err) return cb(err);
    if (user) {
      if (!user.avatar) {
        user.avatar = profile.photos[0].value;
        user.save(function(err) {
          return cb(null, user);
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/User')

console.log(process.env.GITHUB_CLIENT_ID)

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("in")
    console.log(process.env.GITHUB_CLIENT_ID)
    console.log(process.env.GITHUB_CLIENT_SECRET)
    User.findOne({ 'githubId': profile.id }, function(err, student) {
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
      } else {
        return cb(null, user);
      }
    } else {
      // we have a new user via OAuth!
      var newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        googleId: profile.id
      });
      newUser.save(function(err) {
        if (err) return cb(err);
        return cb(null, newUser);
      });
    }
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