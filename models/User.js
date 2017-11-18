var mongoose = require('mongoose');
var findOrCreate = require('mongoose-find-or-create')

var answerSchema = new mongoose.Schema({
  choice: mongoose.Schema.Types.ObjectId,
  result: Boolean,
  questionId: [{ type: mongoose.Schema.Types.ObjectId,
                ref: 'Question' }]
});

var userSchema = new mongoose.Schema({
  fullName: String,
  cohort: String,
  instructor: {type: Boolean, default: false},
  githubId: String,
  answers: [answerSchema],
  quizzes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}]
}, {
  timestamps: true
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
