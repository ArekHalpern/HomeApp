const router = require('express').Router()
const { models: {User}} = require('../db')

const { admin } = require('../services/firebase'); 

router.post('/signup', async (req, res, next) => {
  try {
    const { email, firebaseUid } = req.body;

    // Optionally, verify the Firebase UID with Firebase Admin SDK
    // const firebaseUser = await admin.auth().getUser(firebaseUid);

    const user = await User.create({ email, firebaseUid });
    res.status(201).json(user); // Send back user data
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { firebaseToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const user = await User.findOne({ where: { firebaseUid: decodedToken.uid } });

    if (!user) {
      return res.status(401).send('User not found');
    }

    res.json(user); // Or any other user data you want to send
  } catch (err) {
    next(err);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ where: { firebaseUid: decodedToken.uid } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user); // Send user data
  } catch (error) {
    next(error);
  }
});
