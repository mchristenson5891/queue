var Quiz = require('./../models/Quiz');

function index(req, res) {
  console.log('hello');
  if (!req.user) return res.redirect('/');

  Quiz.find({}, (err,quizzes) => {
    res.render('./quizzes/index', {quizzes});
  });
}

function show(req, res) {
  Quiz.findById(req.params.id, (err, quiz) => {
    res.render('./quizzes/show', {quiz})
  });
}

function getQuiz(req, res) {
  console.log('req.body = ', req.body);
  res.redirect(`/quizzes/${req.body.quizName}`);
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
  deleteQuiz,
  getQuiz
}
