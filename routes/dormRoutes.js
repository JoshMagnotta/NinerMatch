const express = require('express');
const controller = require('../controllers/dormController.js');
const router = express.Router();
const dormController = require('../controllers/dormController'); 

router.get('/', controller.index);

router.get('/dorms', dormController.index);

module.exports = router;


