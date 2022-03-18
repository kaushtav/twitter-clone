const express = require('express');
const router = express.Router();

const {tweet} = require('../controllers');
const {protect} = require('../middleware/auth');
router.route('/getTweet').post(tweet.getTweet);
router.route('/getTweets').post(tweet.getTweets);
router.route('/likeTweet').post(protect, tweet.likeTweet);
router.route('/unlikeTweet').post(protect,tweet.unlikeTweet);

module.exports = router;

