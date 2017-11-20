var Quiz = require('./../models/Quiz');

function index(req, res) {
  res.render('./quizzes/index');
}

function show(req, res) {
  Quiz.findById(req.params.id, (err, doc) => {
    res.render('./quizzes/show', {quiz: doc})
});
}

function newQuiz(req, res) {
  res.render('./quizzes/new');
}

function create(req, res) {
  var quiz = new Quiz(req.body);
  // quiz.question.push(req.body.question);
  if (quiz.save()) {
    console.log(quiz)
    res.redirect(`/quizzes/${quiz.id}`);
  } else {
    res.render('./quizzes/new');
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