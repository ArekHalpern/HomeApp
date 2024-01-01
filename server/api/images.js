const router = require('express').Router();
const { models: { Image } } = require('../db');
const { isLoggedIn } = require('../auth/middleware'); 

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

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, description, filePath, urlPath } = req.body;

    const image = await Image.findOne({
      where: {
        id,
        userId
      }
    });

    if (!image) {
      return res.status(404).send('Image not found or you do not have permission to update it');
    }

    await image.update({
      name,
      description,
      filePath,
      urlPath
    });

    res.json(image);
  } catch (err) {
    next(err);
  }
});


router.patch('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, description } = req.body; 

    const image = await Image.findOne({
      where: {
        id,
        userId
      }
    });

    if (!image) {
      return res.status(404).send('Image not found or you do not have permission to update it');
    }

    await image.update({
      name: name || image.name,
      description: description || image.description
    });

    res.json(image);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const image = await Image.findOne({
      where: {
        id,
        userId
      }
    });

    if (!image) {
      return res.status(404).send('Image not found or you do not have permission to delete it');
    }

    await image.destroy();
    res.status(204).send(); 
  } catch (err) {
    next(err);
  }
});


module.exports = router;