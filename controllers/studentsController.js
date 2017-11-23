var Student = require('./../models/User');

function index(req, res) {
  Student.find({}, (err, students) => {
    res.render('./students/index', {students});
  });
}

function show(req, res) {
  Student.findById(req.params.id, (err, student) => {
    res.render('./students/show', {student});
  })
}


module.exports = {
  index,
  show
}