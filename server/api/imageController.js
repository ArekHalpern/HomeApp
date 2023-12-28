// // imageController.js
// const { callFalAiService } = require('../services/falService.js');
// const router = require('express').Router();

// router.post('/', async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log('Received prompt:', prompt);
//     const result = await callFalAiService(prompt);
//     console.log('Received result from fal.ai:', result);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

