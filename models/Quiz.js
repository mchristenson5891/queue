var mongoose = require('mongoose');

var optionSchema = new mongoose.Schema({
  option: String
});

var questionSchema = new mongoose.Schema({
  question: String,
  correctAnswer: mongoose.Schema.Types.ObjectId,
  options: [optionsSchema],
});

var quizSchema = new mongoose.Schema({
  name: String,
  questions: [questionSchema]
})

module.exports = mongoose.model('Quiz', quizSchema);
