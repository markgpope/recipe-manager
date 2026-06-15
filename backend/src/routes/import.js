const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');
const instagramScraper = require('../services/instagramScraper');

// Import from Instagram
router.post('/instagram', auth, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Instagram credentials required' });
    }
    
    const savedPosts = await instagramScraper.scrapeUserSavedRecipes(username, password);
    
    // Save recipes to database
    const recipes = await Promise.all(
      savedPosts.map(post => {
        const recipe = new Recipe({
          userId: req.user.uid,
          title: post.caption?.split('\n')[0] || 'Untitled Recipe',
          description: post.caption || '',
          images: [{
            url: post.imageUrl,
            source: 'instagram'
          }],
          source: 'instagram',
          sourceData: post
        });
        return recipe.save();
      })
    );
    
    res.json({ 
      message: `Imported ${recipes.length} recipes from Instagram`,
      recipes 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Import from Notes
router.post('/notes', auth, async (req, res) => {
  try {
    // Note: This requires the frontend to pass notes data
    const { notes } = req.body;
    
    if (!notes || !Array.isArray(notes)) {
      return res.status(400).json({ error: 'Notes array required' });
    }
    
    const recipes = await Promise.all(
      notes.map(note => {
        const recipe = new Recipe({
          userId: req.user.uid,
          title: note.title || 'Untitled Recipe',
          description: note.content || '',
          source: 'notes',
          sourceData: note
        });
        return recipe.save();
      })
    );
    
    res.json({ 
      message: `Imported ${recipes.length} recipes from Notes`,
      recipes 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
