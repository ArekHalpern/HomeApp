const { models: { User }} = require('../db')

async function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (!user) {
      return res.status(401).send('You are not authorized');
    }
    req.user = user;
    next(); 
  } catch (error) {
    next(error);
  }
}

module.exports = { isLoggedIn };

