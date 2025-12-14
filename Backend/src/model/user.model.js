const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength:[2, 'Username must be at least 2 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
    
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;