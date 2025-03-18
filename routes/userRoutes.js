const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.renderLoginPage);

router.post('/login', userController.handleLogin);

module.exports = router;
