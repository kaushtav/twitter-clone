const User = require("../models/User");
const ErrorResponse = require('../utils/errorResponse');

exports.signIn = async (req, res, next) => {
    const {  password, handle } = req.body;
    console.log(password,handle)
    if (!handle || !password) {
        return next(new ErrorResponse('Please provide username and password', 400));
    }
    try {
        const user = await User.findOne({ handle }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }
        const isMatch = await user.matchPasswords(password);
        console.log(isMatch)
        if (!isMatch) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }
        sendToken(user, 200, res);
    } catch (error) {
        console.log(error);
        error.status = 403;
        next(error);
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res
        .status(statusCode)
        .json({
            success:true,
            user,
            token,
        });
};

exports.signUp = async (req, res, next) => {
    const {name, email, password, handle} = req.body;
    console.log(name,email,handle,password)
    try {
        const user = await User.create({
            name,
            email,
            password,
            handle
        });
        sendToken(user, 201, res);
    } catch (error) {
        error.status = 403
        next(error);
    }
};

