const express = require('express');
const router = express.Router();

const {tweet} = require('../controllers');
router.route('/getTweet').post(tweet.getTweet);
router.route('/getTweets').post(tweet.getTweets);

module.exports = router;

