const { admin } = require('../services/firebaseAdmin');

async function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) {
      return res.status(401).send('Authorization token missing');
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = await User.findOne({ where: { firebaseUid: decodedToken.uid } });
    if (!req.user) {
      throw new Error('User not found');
    }
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
}

module.exports = { isLoggedIn };
