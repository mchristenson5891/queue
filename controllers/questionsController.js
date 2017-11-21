var Question = require('./../models/Quiz');
var Quiz = require('./../models/Quiz');

function index(req, res) {
  res.render('./questions/index');
}

function showQuestion(req, res) {
  console.log(req.params)
  Quiz.findOne({'questions._id':req.params.questionId}, (err, quiz) => {
    var question = quiz.questions.id(req.params.questionId)
    res.render('./questions/show', {question})
  });
}

function editQuestion(req, res) {


}

function newQuestion(req, res) {
  Quiz.findById(req.params.id, (err, quiz) => {
  res.render(`./questions/new`, {quiz: quiz})
});
}

function createQuestion(req, res) {
  Quiz.findById(req.params.id, (err, quiz) => {
    quiz.questions.push(req.body)

    if (quiz.save()) {
      res.redirect(`/quizzes/${quiz._id}`)
    } else {
      res.redirect('/');
    }
  });
}

function deleteQuestion(req, res) {
  Quiz.findOne({'questions._id': req.params.questionId}, (err, quiz) => {
    quiz.questions.remove(req.params.questionId);
    quiz.save((err) => {
      res.redirect(`/quizzes/${quiz.id}`);
    }); 
  });
}

function newOption(req, res) {
  Quiz.findOne({'questions._id': req.params.questionId}, (err, quiz) => {
    var question = quiz.questions.id(req.params.questionId)
    res.render('options/new', {question});
  })
}

function createOption(req, res) {
console.log(req.body);
Quiz.findOne({'questions._id': req.params.questionId}, (err, quiz) => {
  var question = quiz.questions.id(req.params.questionId)
  question.options.push(req.body)
  quiz.save((err) => {
    res.redirect(`/quizzes/questions/${question.id}/options/new`)
    });
  });
}

function deleteOption(req, res) {
    Quiz.findOne({'questions._id': req.params.questionId}, (err, quiz) => {
    var question = quiz.questions.id(req.params.questionId)
    question.options.remove(req.params.optionId)
    quiz.save((err) => {
      res.redirect(`/quizzes/questions/${req.params.questionId}/options/new`);
    });
  });
}


module.exports = {
  index,
  showQuestion,
  newQuestion,
  editQuestion,
  createQuestion,
  deleteQuestion,
  newOption,
  createOption,
  deleteOption
}