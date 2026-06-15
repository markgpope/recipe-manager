const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Verify Firebase token
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
