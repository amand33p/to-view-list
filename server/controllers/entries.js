const router = require('express').Router();
const Entry = require('../models/entry');

router.get('/', async (_req, res) => {
  res.status(200).send('working');
});

module.exports = router;
