var mongoose = require('mongoose');
var optionsSchema = require('./Option');
var answerSchema = require('./Answer');

var questionSchema = new mongoose.Schema({
  question: String,
  correctAnswer: Number,
  options: [optionsSchema],
});





module.exports = questionSchema;
