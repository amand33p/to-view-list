const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const { SECRET } = require('../utils/config');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const credentialsValid =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    return res.status(401).send({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.username, email: user.email });
});

module.exports = router;
