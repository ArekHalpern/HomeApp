const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./users');
const imageRoutes = require('./images');
// const imageController = require('./imageController');
const falProxyRouter = require('./fal/proxy'); // The path should point to where the proxy.js file is located.

// API routing
router.use('/users', userRoutes);
router.use('/images', imageRoutes);
// router.use('/generate-image', imageController);
router.use('/fal/proxy', falProxyRouter); // Add the proxy route like this

// Catch-all for any other API route not found
router.use((req, res, next) => {
  const error = new Error('API route not found');
  error.status = 404;
  next(error);
});

module.exports = router;
