const router = require('express').Router()
const {models: {Image}} = require('../db')

// Get all images
router.get('/', async (req, res, next) => {
    
    try {
      const images = await Image.findAll();
      res.json(images);
    } catch (err) {
      next(err);
    }
  });
  
  //Get single image
  router.get('/:id', async (req, res, next) => {
    try {
      const image = await Image.findByPk(req.params.id);
      if (image) {
        res.json(image);
      } else {
        res.status(404).send('Image not found');
      }
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;