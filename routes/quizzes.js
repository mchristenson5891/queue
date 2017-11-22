var express = require('express');
var router = express.Router();
var quizzes = require('./../controllers/quizzesController');
var questions = require('./../controllers/questionsController');

router.get('/', quizzes.index);
router.get('/new', isLoggedIn, quizzes.newQuiz);
router.post('/', isLoggedIn, quizzes.create);
router.get('/:id', quizzes.show);
router.delete('/:id', isLoggedIn, quizzes.deleteQuiz);
router.get('/:id/questions/new', questions.newQuestion);
router.post('/:id/questions', isLoggedIn, questions.createQuestion);
router.delete('/questions/:questionId', isLoggedIn, questions.deleteQuestion);
router.get('/questions/:questionId', questions.showQuestion);
router.get('/questions/:questionId/options/new', isLoggedIn, questions.newOption);
router.post('/questions/:questionId/options', isLoggedIn, questions.createOption);
router.delete('/options/:optionId', isLoggedIn, questions.deleteOption);
router.put('/options/:id/set', isLoggedIn, questions.setAnswer);
router.post('/getquiz',quizzes.getQuiz);
router.post('/answers', questions.createAnswer);
router.get('/:id/results', quizzes.results);


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    if (res.locals.currentUser.instructor) return next();
    res.redirect('/');
  }else {
    res.redirect('/auth/github/');
  }
}
