const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const validator = require('validator');
const { SECRET } = require('../utils/config');

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ error: 'password must have minimum length of 6' });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).send({ error: 'valid email address is required' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, SECRET);
  res
    .status(200)
    .send({ token, username: savedUser.username, email: savedUser.email });
});

module.exports = router;
