var Student = require('./../models/User');
var Quiz = require('./../models/Quiz');

function index(req, res) {
  Student.find({}, (err, students) => {
    res.render('./students/index', {students});
  });
}

function show(req, res) {
  var studentQuizzes = [];
  Student.findById(req.params.id, (err, student) => {
    Quiz.find({}, (err, quiz) => {
      res.render('./students/show', {student, quiz});
    })       
  })
}


module.exports = {
  index,
  show
}