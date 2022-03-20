let express = require('express');

const ping = async (req, res) => {
  return res.status(200).send(true)
}

const getRoutes = () => {
  const router = express.Router();
  router.use('/auth', require('./auth'));
  router.use('/user', require('./user'));
  router.use('/tweet',require('./tweet'));
  router.get('/', ping);
  return router;
}

module.exports = {getRoutes};
