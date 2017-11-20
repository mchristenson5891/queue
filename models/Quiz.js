var mongoose = require('mongoose');

var optionSchema = new mongoose.Schema({
  option: String
});

var questionSchema = new mongoose.Schema({
  question: String,
  correctAnswer: mongoose.Schema.Types.ObjectId,
  options: [optionSchema],
  quizID: mongoose.Schema.Types.ObjectId
});

var quizSchema = new mongoose.Schema({
  name: String,
  questions: [questionSchema]
})

module.exports = mongoose.model('Quiz', quizSchema);
