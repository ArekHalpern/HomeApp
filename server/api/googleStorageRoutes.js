const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const router = express.Router();

// Load environment variables
require('dotenv').config();
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS); // This should print the correct path

// Configure Google Cloud Storage
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

// Configure multer for file handling
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 5 MB file size limit
    fieldSize: 25 * 1024 * 1024 // Increased field size limit to 25 MB
  }
});

// Image upload endpoint
router.post('/upload', uploader.single('image'), async (req, res, next) => {
  if (!req.file) {
      console.log('No file uploaded.');
      return res.status(400).send('No file uploaded.');
  }

  try {
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({
          resumable: false
      });

      blobStream.on('error', err => next(err));

      blobStream.on('finish', async () => {
          // Make the image publicly readable
          await blob.makePublic();

          // Construct the public URL
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

          // Send the public URL in the response
          res.status(200).send({ image_archive_url: publicUrl });
      });

      blobStream.end(req.file.buffer);
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send(`Server Error: ${error}`);
  }
});


module.exports = router;
