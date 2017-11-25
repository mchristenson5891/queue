var User = require('./../models/User');
var Quiz = require('./../models/Quiz');

function index(req, res) {
  User.find({}, (err, students) => {
    res.render('./students/index', {students});
  });
}

function show(req, res) {
  User.findById(req.params.id).populate('quizzes').exec((err, student) => {
    res.render('students/show', {student});
  })
}

module.exports = {
  index,
  show
}