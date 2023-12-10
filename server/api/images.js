const router = require('express').Router();
const { models: { Image } } = require('../db');
const { isLoggedIn } = require('../auth/middleware'); // Correct import of isLoggedIn middleware

// Get all images for the logged-in user
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const images = await Image.findAll({
      where: { userId: userId }
    });
    res.json(images);
  } catch (err) {
    next(err);
  }
});

// Get a single image by ID for the logged-in user
router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const image = await Image.findOne({
      where: {
        id: req.params.id,
        userId: userId 
      }
    });
    if (image) {
      res.json(image);
    } else {
      res.status(404).send('Image not found or you do not have permission to view it');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { name, description, filePath, urlPath } = req.body;
    const userId = req.user.id;

    const newImage = await Image.create({
      name,
      description,
      filePath,
      urlPath,
      userId 
    });

    res.status(201).json(newImage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;