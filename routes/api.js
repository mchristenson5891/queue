var express = require('express');
var router = express.Router();
var Quiz = require('./../models/Quiz');

router.get('/', (req, res) => {
  Quiz.find({}, (err, quizzes) => {
    res.json(quizzes);
  });
});

router.get('/:id', (req, res) => {
  Quiz.findById(req.params.id, (err, quiz) => {
    res.json(quiz);
  });
});

module.exports = router;