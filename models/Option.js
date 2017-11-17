var mongoose = require('mongoose');
var question = require('./Question');


var optionSchema = new mongoose.Schema({
  option: String,
  questionId: [{ type: mongoose.Schema.Types.ObjectId,
                ref: 'question' }]
});


module.exports = optionSchema;
