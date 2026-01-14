const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        let token;

        // 1️ Check cookie first
        if (req.cookies?.token) {
            token = req.cookies.token;
        }
        // 2️ Then check Authorization header
        else if (req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'YOU ARE UNAUTHORIZED || PLEAS LOGIN FIRST' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'YOU ARE UNAUTHORIZED || PLEAS LOGIN FIRST' });
        }

        req.user = await userModel.findById(decoded._id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
};
