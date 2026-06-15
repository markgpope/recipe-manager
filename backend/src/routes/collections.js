const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');
const auth = require('../middleware/auth');

// Get all collections
router.get('/', auth, async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.user.uid }).populate('recipes');
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create collection
router.post('/', auth, async (req, res) => {
  try {
    const collection = new Collection({
      ...req.body,
      userId: req.user.uid
    });
    await collection.save();
    res.status(201).json(collection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update collection
router.put('/:id', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection || collection.userId !== req.user.uid) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    Object.assign(collection, req.body);
    collection.updatedAt = Date.now();
    await collection.save();
    res.json(collection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete collection
router.delete('/:id', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection || collection.userId !== req.user.uid) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    await Collection.deleteOne({ _id: req.params.id });
    res.json({ message: 'Collection deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
