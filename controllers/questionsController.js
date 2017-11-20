var Question = require('./../models/Quiz');
var Quiz = require('./../models/Quiz');

function index(req, res) {
  res.render('./questions/index');
}

function show(req, res) {
  Quiz.findById(req.params.id, (err, doc) => {
    res.render('./questions/show')
  })
}

function editQuestion(req, res) {


}

function newQuestion(req, res) {
  console.log(req.params)
  Quiz.findById(req.params.id, (err, doc) => {
  res.render(`./questions/new`, {quiz: doc})
});
}

function create(req, res) {
  console.log(req.params.id)
  Quiz.findById(req.params.id, (err, quiz) => {
    console.log(quiz, req.body)
    // quiz.questions.push(req.body)
    //   console.log(quiz)
    // res.render(`./question/:id`, {quiz: doc})
  });
}

function deleteQuestion(req, res) {

}

module.exports = {
  index,
  show,
  newQuestion,
  editQuestion,
  create,
  deleteQuestion
}