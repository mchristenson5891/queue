var express = require('express');
var router = express.Router();
var instructors = require('./../controllers/instructorsController');


router.get('/', instructors.index);
router.post('/quizzes/:id/cohort/:cohortNum', instructors.assignQuiz);
router.get('/:id/quiz/:quizId/results', instructors.getResults)

module.exports = router;

