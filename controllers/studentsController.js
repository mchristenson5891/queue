var Student = require('./../models/User');

function index(req, res) {
  res.render('./students/index');
}

module.exports = {
  index
}