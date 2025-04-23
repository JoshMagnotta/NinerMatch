const express = require('express');
const router = express.Router();
const controller = require('../controllers/dormController');

router.get('/', controller.index); // List dorms
router.get('/:id', controller.getDorm); // Single dorm view
router.post('/:id/review', controller.addReview); // Review submission

module.exports = router;