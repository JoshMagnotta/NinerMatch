const express = require('express');
const controller = require('../controllers/roommateController');
const Roommate = require('../models/roommateModel'); 
const router = express.Router();
    
router.get('/', controller.index);

router.post('/create', controller.create);

router.get('/:id', controller.getPost);

router.post('/:id/comment', controller.comment);

module.exports = router;