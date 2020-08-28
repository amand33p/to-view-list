const router = require('express').Router();
const Entry = require('../models/entry');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const validator = require('validator');

router.get('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).send({ error: 'token missing or invalid' });
  }

  const entries = await Entry.find({ user: decodedToken.id });
  res.json(entries);
});

router.post('/', async (req, res) => {
  const { title, link, description, type, tags } = req.body;

  const decodedToken = jwt.verify(req.token, SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).send({ error: 'token missing or invalid' });
  }

  if (!link || !validator.isURL(link)) {
    return res.status(401).send({ error: 'valid url required for link field' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(404).send({ error: 'user does not exist in db' });
  }

  const entry = new Entry({
    title,
    link,
    description,
    type,
    tags,
    user: user._id,
  });

  const savedEntry = await entry.save();
  res.status(201).json(savedEntry);
});

router.delete('/:id', async (req, res) => {
  const { id: entryId } = req.params;
  const decodedToken = jwt.verify(req.token, SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).send({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const entry = await Entry.findById(entryId);

  if (!user) {
    return res.status(404).send({ error: 'user does not exist in db' });
  }

  if (!entry) {
    return res
      .status(404)
      .send({ error: `entry with 'id: ${entryId}' does not exist in db` });
  }

  if (entry.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'access is denied' });
  }

  await Entry.findByIdAndDelete(entryId);
  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const { id: entryId } = req.params;
  const decodedToken = jwt.verify(req.token, SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).send({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const entry = await Entry.findById(entryId);

  if (!user) {
    return res.status(404).send({ error: 'user does not exist in db' });
  }

  if (!entry) {
    return res
      .status(404)
      .send({ error: `entry with 'id: ${entryId}' does not exist in db` });
  }

  if (entry.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'access is denied' });
  }

  const { title, link, description, type, tags } = req.body;

  const updatedEntryObj = {
    title,
    link,
    description,
    type,
    tags,
    user: user._id,
  };

  if (!link || !validator.isURL(link)) {
    return res.status(401).send({ error: 'valid url required for link field' });
  }

  const updatedEntry = await Entry.findByIdAndUpdate(entryId, updatedEntryObj, {
    new: true,
  });
  res.json(updatedEntry);
});

router.patch('/:id/star', async (req, res) => {
  const { id: entryId } = req.params;

  const entry = await Entry.findById(entryId);

  const starredEntry = { ...entry, isStarred: !entry.isStarred };
});

module.exports = router;
