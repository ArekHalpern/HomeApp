const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.raw({ limit: '20mb', type: 'application/octet-stream' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// API routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));


// Catch-all for non-API requests, sends index.html (React app)
app.get('*', (req, res, next) => {
  if (req.path === '/favicon.ico') {
    return res.status(204).end();
  };
  if (path.extname(req.path).length > 0) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);  // Now 'next' is defined
  } else {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
