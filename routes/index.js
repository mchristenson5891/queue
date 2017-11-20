var router = require('express').Router();
var passport= require('passport');

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/auth/github/', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res){
 req.logout();
 res.redirect('/');
});

module.exports = router;
