const router = require('express').Router();

router.use('/users', require('./users'));  
router.use('/images', require('./images'));  
router.use('/generate-image', require('./imageController'));
router.use('./realistic-image', require('./imageController'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;

