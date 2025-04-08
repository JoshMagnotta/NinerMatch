const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.getLoginPage);

router.post('/login', userController.login);

router.get('/signup', userController.getSignUpPage);

router.post('/signup', userController.signUp);

router.get('/profile', userController.getProfilePage);

module.exports = router;
