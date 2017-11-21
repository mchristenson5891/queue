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
  if (res.locals.currentUser.instructor) { 
    Quiz.findById(req.params.id, (err, quiz) => {
      res.render(`./questions/new`, {quiz: quiz})
    });
  } else {
    res.redirect('/');
  }
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
Quiz.findOne({'questions._id': req.params.questionId}, (err, quiz) => {
  var question = quiz.questions.id(req.params.questionId);
  question.options.push(req.body);
  if (question.options.length === 1) question.correctAnswer = question.options[0]._id;
  quiz.save((err) => {
    res.redirect(`/quizzes/questions/${question.id}/options/new`)
    });
  });
}

function deleteOption(req, res) {
    Quiz.findOne({'questions.options._id': req.params.optionId}, (err, quiz) => {
    var question = quiz.questions.find(question => question.options.some(opt => opt._id.equals(req.params.optionId)));
    question.options.remove(req.params.optionId)
    console.log(question.correctAnswer, req.params.optionId);
    if (question.correctAnswer === parseInt(req.params.optionId)) {
      question.correctAnswer = question.options[0]._id;
    } else if (question.options.length === 0) question.correctAnswer = null;
    quiz.save((err) => {
      res.redirect(`/quizzes/questions/${question._id}/options/new`);
    });
  });
}

function setAnswer(req, res) {
  Quiz.findOne({'questions.options._id': req.params.id}, (err, quiz) => {
    var question = quiz.questions.find(question => question.options.some(opt => opt._id.equals(req.params.id)));
    question.correctAnswer = req.params.id;
    quiz.save((err) => {
      res.redirect(`/quizzes/questions/${question._id}/options/new`);
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
  deleteOption,
  setAnswer

}