const express = require('express');
const router = express.Router();

const {auth} = require('../controllers');
router.route('/signIn').post(auth.signIn);
router.route('/signUp').post(auth.signUp);

module.exports = router;

