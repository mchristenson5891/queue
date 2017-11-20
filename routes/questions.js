var express = require('express');
var router = express.Router({mergeParams: true});
var questions = require('./../controllers/questionsController');

router.get('/', questions.index);
router.get('/new', questions.newQuestion);
router.get('/:id/edit', questions.editQuestion);
router.post('/', questions.create);
router.get('/:id', questions.show);
router.delete('/:id', questions.deleteQuestion);

module.exports = router;