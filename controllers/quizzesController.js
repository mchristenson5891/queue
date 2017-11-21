var Quiz = require('./../models/Quiz');

function index(req, res) {
  Quiz.find({}, (err,quizzes) => {
    res.render('./quizzes/index', {quizzes});
  });
}

function show(req, res) {
  Quiz.findById(req.params.id, (err, quiz) => {
    res.render('./quizzes/show', {quiz})
});
}

function newQuiz(req, res) {
  if (res.locals.currentUser.instructor) { 
    res.render('./quizzes/new');
  } else {
    res.redirect('/');
  }
}

function create(req, res) {
  var quiz = new Quiz(req.body);
  if (quiz.save()) {
    res.redirect(`/quizzes/${quiz.id}`);
  } else {
    res.render('./quizzes/new', {quiz});
  }
}

function deleteQuiz(req, res) {
  Quiz.findById(req.params.id, (err, quiz) => {
    quiz.remove();
    res.redirect('/quizzes');
  });
}

module.exports = {
  index,
  show,
  newQuiz,
  create,
  deleteQuiz
}