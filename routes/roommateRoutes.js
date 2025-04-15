const express = require('express');
const controller = require('../controllers/roommateController');

const router = express.Router();
    
router.get('/', controller.index);

router.post('/create', controller.create);

router.get('/:id', controller.getPost);

module.exports = router;