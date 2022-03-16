let express = require('express');
let router = express.Router();

// const { auth } = require('../components');
// const { users } = require('../components');
// const { profiles } = require('../components');
// const { tweets } = require('../components');

const pingServer = async (req, res, next) => {
  console.log('here')
  return res.status(200).send(true)
}

const getRoutes = () => {
  const router = express.Router();
  // router.use('/auth', auth.authRoutes);
  // router.use('/users', users.userRoutes);
  // router.use('/profiles', profiles.profileRoutes);
  // router.use('/tweets', tweets.tweetRoutes);
  router.get('/', pingServer);

  return router;
}

module.exports = {getRoutes};
