var Instructor = require('./../models/User');

function index(req, res) {
  res.render('./instructors/index', {currentUser});
}

module.exports = {
  index
}