const express = require('express');
const router = express.Router();

const {tweet} = require('../controllers');
router.route('/getTweet').post(tweet.getTweet);

module.exports = router;

