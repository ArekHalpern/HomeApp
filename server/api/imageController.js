// imageController.js
const { generateImage, } = require('../services/SDXL.js');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { prompt, negativePrompt } = req.body;
    console.log('Received prompt:', prompt);
    console.log('Received negative prompt:', negativePrompt);
    const image = await generateImage(prompt, negativePrompt);
    console.log('Generated image:', image);
    res.json({ image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
