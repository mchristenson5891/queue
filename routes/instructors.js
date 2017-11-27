var express = require('express');
var router = express.Router();
var instructors = require('./../controllers/instructorsController');

router.get('/', isInstructor, instructors.index);
router.post('/quizzes/:id/cohort/:cohortNum', isInstructor, instructors.assignQuiz);
router.get('/:id/quiz/:quizId/results', isInstructor, instructors.getResults);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/github');
}

function isInstructor(req, res, next) {
  if(res.locals.currentUser.instructor) return next();
  res.redirect('/quizzes');
}