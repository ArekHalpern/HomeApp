const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./users');
const imageRoutes = require('./images');
// const imageController = require('./imageController');
const falProxyRouter = require('./fal/proxy'); 

// API routing
router.use('/users', userRoutes);
router.use('/images', imageRoutes);
// router.use('/generate-image', imageController);
router.use('/fal/proxy', falProxyRouter);

// Catch-all for any other API route not found
router.use((req, res, next) => {
  const error = new Error('API route not found');
  error.status = 404;
  next(error);
});

module.exports = router;
