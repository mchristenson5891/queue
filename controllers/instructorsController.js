var User = require('./../models/User');
var Quiz = require('./../models/Quiz');

function index(req, res) {
  res.render('./instructors/index', {currentUser});
}

function assignQuiz(req, res) {
  User.find({'cohort': req.params.cohortNum}, (err, students) => {
    Quiz.findById(req.params.id, (err, quiz) => {
      students.forEach((student => {
        if(!student.quizzes.some( quiz => quiz.equals(req.params.id))){
          student.quizzes.push(quiz);
          student.save()
        }
      }))
      res.redirect('/');
    })
      
  })
}


module.exports = {
  index,
  assignQuiz
}