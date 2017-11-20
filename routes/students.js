var express = require('express');
var router = express.Router();
var students = require('./../controllers/studentsController');

router.get('/', students.index);



module.exports = router;
