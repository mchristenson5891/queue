var router = require('express').Router();
var passport= require('passport');
var User = require('./../models/User');

router.get('/', (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.instructor) {
    res.render('instructors/index');
  } else if (res.locals.currentUser) {
    res.redirect('/quizzes');
  } 
  res.render('index');
});

router.get('/logout', (req, res) => { 
  req.logout(); 
  res.redirect('/')
});

router.get('/auth/github/', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github'), (req, res) => {
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/github');
}

function isInstructor(req, res, next) {
  if(res.locals.currentUser.instructor) return next();
  res.redirect('/quizzes');
}
module.exports = router;