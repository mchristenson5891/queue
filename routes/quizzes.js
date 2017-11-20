var express = require('express');
var router = express.Router();
var quizzes = require('./../controllers/quizzesController');

router.get('/', quizzes.index);
router.get('/new', quizzes.newQuiz);
router.post('/', quizzes.create);
router.get('/:id', quizzes.show);
router.delete('/:id', quizzes.deleteQuiz);

module.exports = router;