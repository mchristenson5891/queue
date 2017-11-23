var express = require('express');
var router = express.Router();
var instructors = require('./../controllers/instructorsController');

router.get('/', instructors.index);

module.exports = router;