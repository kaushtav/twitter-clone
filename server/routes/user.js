const express = require('express')
const router = express.Router();
const {user} = require('../controllers')
const {protect} = require('../middleware/auth');
router.route("/").get(protect, user.getUser);
router.route("/createTweet").post(protect, user.createTweet);
module.exports = router;
