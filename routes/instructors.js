var express = require('express');
var router = express.Router();
var instructors = require('./../controllers/instructorsController');


router.get('/', instructors.index);
router.post('/quizzes/:id/cohort/:cohortNum', isInstructor, instructors.assignQuiz);
router.get('/:id/quiz/:quizId/results', isInstructor, instructors.getResults)

module.exports = router;

function isInstructor(req, res, next) {
  if(res.locals.currentUser.instructor) return next();
  res.redirect('/quizzes');
}