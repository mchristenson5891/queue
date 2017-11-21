var express = require('express');
var router = express.Router();
var quizzes = require('./../controllers/quizzesController');
var questions = require('./../controllers/questionsController');

router.get('/', quizzes.index);
router.get('/new', quizzes.newQuiz);
router.post('/', quizzes.create);
router.get('/:id', quizzes.show);
router.delete('/:id', quizzes.deleteQuiz);
router.get('/:id/questions/new', questions.newQuestion);
router.post('/:id/questions', questions.createQuestion);
router.delete('/questions/:questionId', questions.deleteQuestion);
router.get('/questions/:questionId', questions.showQuestion);
router.get('/questions/:questionId/options/new', questions.newOption);
router.post('/questions/:questionId/options', questions.createOption);
router.delete('/options/:optionId', questions.deleteOption);
router.put('/options/:id/set', questions.setAnswer);


module.exports = router;