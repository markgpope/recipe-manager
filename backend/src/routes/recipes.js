const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// Get all recipes for user
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.uid });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single recipe
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || recipe.userId !== req.user.uid) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create recipe
router.post('/', auth, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      userId: req.user.uid
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update recipe
router.put('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || recipe.userId !== req.user.uid) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    Object.assign(recipe, req.body);
    recipe.updatedAt = Date.now();
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || recipe.userId !== req.user.uid) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    await Recipe.deleteOne({ _id: req.params.id });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
