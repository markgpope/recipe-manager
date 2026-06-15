const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  ingredients: [{
    name: String,
    quantity: String,
    unit: String
  }],
  instructions: [{
    step: Number,
    description: String
  }],
  images: [{
    url: String,
    source: String // 'uploaded', 'url', 'instagram'
  }],
  tags: [String],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  cookTime: Number, // in minutes
  prepTime: Number, // in minutes
  servings: Number,
  source: {
    type: String,
    enum: ['manual', 'notes', 'instagram'],
    default: 'manual'
  },
  sourceData: mongoose.Schema.Types.Mixed, // Store original data
  isFavorite: {
    type: Boolean,
    default: false
  },
  collections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
