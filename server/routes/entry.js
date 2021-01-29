const express = require('express');
const {
  getEntries,
  addNewEntry,
  deleteEntry,
  updateEntry,
  starEntry,
  markEntryAsViewed,
} = require('../controllers/entry');
const { auth } = require('../utils/middleware');

const router = express.Router();

router.get('/', auth, getEntries);
router.post('/', auth, addNewEntry);
router.delete('/:id', auth, deleteEntry);
router.put('/:id', auth, updateEntry);
router.patch('/:id/star', starEntry);
router.patch('/:id/view', markEntryAsViewed);

module.exports = router;
