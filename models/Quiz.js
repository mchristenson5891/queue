var mongoose = require('mongoose');
var user = require('./User');
var questionSchema = require('./Question')

var quizSchema = new mongoose.Schema({
  name: String,
  usersId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  questions: [questionSchema]
})


module.exports = quizSchema;
