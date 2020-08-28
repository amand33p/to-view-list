const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const { SECRET } = require('../utils/config');

/*router.get('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).send({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(401).send({ error: `user doesn't exist in database` });
  }

  res.json(user);
});*/

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
