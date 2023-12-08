const express = require('express');
const { generateImage } = require('./replicateService');
const router = express.Router();

router.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    //user authentication
    const image = await generateImage(prompt);
    res.json({ image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;