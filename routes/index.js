var router = require('express').Router();
var passport= require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/auth/github/',
  passport.authenticate('github'));



router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;
