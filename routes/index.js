var router = require('express').Router();
var passport= require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/auth/github',
  passport.authenticate('github'));




module.exports = router;
