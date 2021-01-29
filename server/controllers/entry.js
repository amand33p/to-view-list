const Entry = require('../models/entry');
const User = require('../models/user');
const validator = require('validator');

const getEntries = async (req, res) => {
  const entries = await Entry.find({ user: req.user });
  res.json(entries);
};

const addNewEntry = async (req, res) => {
  const { title, link, description, type, tags } = req.body;

  if (!link || !validator.isURL(link)) {
    return res
      .status(401)
      .send({ error: 'Valid URL is required for link field.' });
  }

  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
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
};

const deleteEntry = async (req, res) => {
  const { id: entryId } = req.params;

  const user = await User.findById(req.user);
  const entry = await Entry.findById(entryId);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  if (!entry) {
    return res
      .status(404)
      .send({ error: `Entry with ID: ${entryId} does not exist in database.` });
  }

  if (entry.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Access is denied.' });
  }

  await Entry.findByIdAndDelete(entryId);
  res.status(204).end();
};

const updateEntry = async (req, res) => {
  const { id: entryId } = req.params;
  const { title, link, description, type, tags } = req.body;

  if (!title || !link || !description || !type || !tags) {
    return res.status(400).send({ error: 'Not all fields have been entered.' });
  }

  if (!link || !validator.isURL(link)) {
    return res
      .status(401)
      .send({ error: 'Valid URL is required for link field.' });
  }

  const user = await User.findById(req.user);
  const entry = await Entry.findById(entryId);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  if (!entry) {
    return res
      .status(404)
      .send({ error: `Entry with ID: ${entryId} does not exist in database.` });
  }

  if (entry.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Access is denied.' });
  }

  const updatedEntryObj = {
    title,
    link,
    description,
    type,
    tags,
    user: user._id,
  };

  const updatedEntry = await Entry.findByIdAndUpdate(entryId, updatedEntryObj, {
    new: true,
  });
  res.json(updatedEntry);
};

const starEntry = async (req, res) => {
  const { id: entryId } = req.params;

  const entry = await Entry.findById(entryId);

  if (!entry) {
    return res
      .status(404)
      .send({ error: `Entry with ID: ${entryId} does not exist in database.` });
  }

  entry.isStarred = !entry.isStarred;

  await entry.save();
  res.status(202).end();
};

const markEntryAsViewed = async (req, res) => {
  const { id: entryId } = req.params;

  const entry = await Entry.findById(entryId);

  if (!entry) {
    return res
      .status(404)
      .send({ error: `Entry with ID: ${entryId} does not exist in database.` });
  }

  entry.isViewed = !entry.isViewed;

  await entry.save();
  res.status(202).end();
};

module.exports = {
  getEntries,
  addNewEntry,
  deleteEntry,
  updateEntry,
  starEntry,
  markEntryAsViewed,
};
