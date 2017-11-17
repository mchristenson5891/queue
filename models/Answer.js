var mongoose = require('mongoose');
var question = require('./Question');

var answerSchema = new mongoose.Schema({
  choice: String,
  result: Boolean,
  questionId: [{ type: mongoose.Schema.Types.ObjectId,
                ref: 'question' }]
});

module.exports = answerSchema;
