// imageController.js
const { generateImage, realisticImage } = require('../services/replicateService');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    // User authentication (if needed)
    const image = await generateImage(prompt);
    res.json({ image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    // User authentication (if needed)
    const image = await realisticImage(prompt);
    res.json({ image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
