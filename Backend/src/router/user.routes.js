const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/user.controller');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/register',[
    body('username').isLength({min:2}).withMessage('Username must be at least 2 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long')   
], userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')   
], userController.loginUser);

router.get('/profile', authUser, userController.getUserProfile);



module.exports = router;