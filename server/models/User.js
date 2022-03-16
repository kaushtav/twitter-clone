const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Please add a password with length greater than 6 characters'],
        select: false,
    },
    handle: {
        type:String,
        required: [true, 'Please provide a username'],
        unique: true,
        match: [
            /^[A-Za-z]+$/,
            'Please provide a valid email',
        ],

    },
    email: {
        type: String,
        required: [true, 'Please provide a user email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    followers:{
        type: Number
    },
    following:{
        type: Number
    },
    tweets:{
        type: Number
    },
    picture:{
        type:String,
        default:'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
    }
});


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const User = mongoose.model('users', UserSchema)

module.exports = User;
