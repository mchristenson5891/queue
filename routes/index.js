var router = require('express').Router();
var passport= require('passport');
var User = require('./../models/User');


router.get('/', function(req, res) {
  if (req.body.instructor === true) {
    User.find({instructor: true}, (err, teacher) => {
      console.log(teacher)
      res.render('index', {user: teacher});
    }) 
  } else {
    User.find({instructor: false}, (err, student) => {
      console.log(student);
      res.render('index', {user: student})
    })
  };
});


router.get('/logout', (req, res) => { req.logout(); res.render('index', {user: null})})

router.get('/auth/github/', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github'), (req, res) => {
    res.redirect('/')
});


module.exports = router;