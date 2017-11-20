var router = require('express').Router();
var passport= require('passport');
var User = require('./../models/User');

router.get('/', function(req, res) {
  User.find({}, (err, teacher) => {
    console.log(teacher)
  })
  res.render('index', {user: teacher1});
});

router.get('/logout', (req, res) => { req.logout(); req.session.destroy(); res.redirect('/'); })

router.get('/auth/github/', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github'), (req, res) => {
    res.redirect('/')
});


module.exports = router;