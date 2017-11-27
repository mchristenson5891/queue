var express = require('express');
var router = express.Router();
var quizzes = require('./../controllers/quizzesController');
var questions = require('./../controllers/questionsController');

router.get('/', isLoggedIn, quizzes.index);
router.get('/new', isInstructor, quizzes.newQuiz);
router.post('/', isInstructor, quizzes.create);
router.get('/:id', isLoggedIn, quizzes.show);
router.delete('/:id', isInstructor, quizzes.deleteQuiz);
router.get('/:id/questions/new', isInstructor, questions.newQuestion);
router.post('/:id/questions', isInstructor, questions.createQuestion);
router.delete('/questions/:questionId', isInstructor, questions.deleteQuestion);
router.get('/questions/:questionId', isLoggedIn, questions.showQuestion);
router.get('/questions/:questionId/options/new', isInstructor, questions.newOption);
router.post('/questions/:questionId/options', isInstructor, questions.createOption);
router.delete('/options/:optionId', isInstructor, questions.deleteOption);
router.put('/options/:id/set', isInstructor, questions.setAnswer);
router.post('/answers', isLoggedIn, questions.createAnswer);
router.get('/:id/results', isLoggedIn, quizzes.results);
router.put('/:id', isInstructor, quizzes.editQuiz);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/github');
}

function isInstructor(req, res, next) {
  if(res.locals.currentUser.instructor) return next();
  res.redirect('/quizzes');
}
