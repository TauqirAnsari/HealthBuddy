const userModel = require('../model/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');


module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const hashPassword = await userModel.hashPassword(password);


    const user = await userService.createUser({
        username,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        message: 'User registered successfully',
        token,user
    });
}
