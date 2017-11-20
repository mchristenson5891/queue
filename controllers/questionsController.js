var Question = require('./../models/Quiz');

function index(req, res) {
  res.render('./questions/index');
}

function show(req, res) {

}

function editQuestion(req, res) {


}

function newQuestion(req, res) {
  res.render('./questions/${quiz.id}/new');
}

function create(req, res) {

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