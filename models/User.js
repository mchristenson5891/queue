var mongoose = require('mongoose');
var answerSchema = require('./Answer');
var quizSchema = require('./Quiz')

var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  cohort: Number,
  instructor: Boolean,
  githubId: String,
  percent_correct: Number,
  answers: [answerSchema],
  quizzes: [quizSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
