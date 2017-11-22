var router = require('express').Router();
var passport= require('passport');
var User = require('./../models/User');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => { 
  req.logout(); 
  res.render('index')
});

router.get('/auth/github/', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github'), (req, res) => {
    res.redirect('/quizzes')
});

module.exports = router;