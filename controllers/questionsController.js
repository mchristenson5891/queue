var Question = require('./../models/Quiz');
var Quiz = require('./../models/Quiz');


function index(req, res) {
  res.render('./questions/index');
}

function showQuestion(req, res) { 
  Quiz.findOne({'questions._id':req.params.questionId}, (err, quiz) => {
    var question = quiz.questions.id(req.params.questionId);
    if (req.user.answers.some(answer => {
      answer.questionId.equals(question._id)})) {
      var nextQuestionId = getNextQuestion(quiz, question);
      if (nextQuestionId) {
        question = quiz.questions.id(nextQuestionId);
      } else {
        return res.redirect("/quizzes");
      }
    }
    res.render('./questions/show', {question})
  });
}

function createAnswer(req, res) {
  // get quiz
  var answer = req.body.selectedOption;
  Quiz.findOne({'questions.options._id': answer}, (err, quiz) => {
    var question = quiz.questions.find(q => q.options.some(opt => opt._id.equals(answer)));
    // insure question hasn't been answered
    if (!req.user.answers.some(answer => answer.questionId.equals(question._id))) {
      // push answers subdoc into req.user.answers (compute result)
      req.user.answers.push({
        choice: answer,
        result: (question.correctAnswer.equals(answer)),
        questionId: question._id
      });
    }
    // save req.user
    req.user.save((err) => {
      var nextQuestionId = getNextQuestion(quiz, question);
      if (nextQuestionId) {

        res.redirect(`/quizzes/questions/${nextQuestionId}`);
      } else {
        res.redirect(`/quizzes/${quiz._id}/results`);
      }
    });
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
  setAnswer,
  createAnswer
}

//helper functions 

function getNextQuestion(quiz, question) {
  var indexOfQuestion = quiz.questions.indexOf(question);
  if (quiz.questions[indexOfQuestion + 1] === undefined) {
    return null;
  } else {
    return quiz.questions[indexOfQuestion + 1].id;
  }
}