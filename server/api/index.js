const router = require('express').Router();

// Import routes
const userRoutes = require('./users');
const imageRoutes = require('./images');
const imageController = require('./imageController');

// API routing
router.use('/users', userRoutes);  
router.use('/images', imageRoutes);  
router.use('/generate-image', imageController);

// Catch-all for any other API route not found
router.use((req, res, next) => {
  const error = new Error('API route not found');
  error.status = 404;
  next(error);
});

module.exports = router;
