var mongoose = require('mongoose');
var findOrCreate = require('mongoose-find-or-create')

var answerSchema = new mongoose.Schema({
  choice: mongoose.Schema.Types.ObjectId,
  result: Boolean,
  questionId: { type: mongoose.Schema.Types.ObjectId,
                ref: 'Question' }
});

var userSchema = new mongoose.Schema({
  fullName: String,
  cohort: {type: String, default: '53'},
  instructor: {type: Boolean, default: false},
  githubUserName: String,
  answers: [answerSchema],
  quizzes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}]
}, {
  timestamps: true
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
