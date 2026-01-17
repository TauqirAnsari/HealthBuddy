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
        token,
        user:{
            _id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token, {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  path: '/healthbuddy',   // ✅ IMPORTANT
  maxAge: 7 * 24 * 60 * 60 * 1000
});


    res.status(200).json({
        message: 'Login successful',
        token,
        user:{
            _id: user._id,
            username: user.username,
            email: user.email   
        }
    });
}

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};
module.exports.LogoutUserProfile = async (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/healthbuddy'
    });

    return res.status(200).json({ seccess:true, message: "Logout successfully" });
};