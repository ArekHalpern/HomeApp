const { models: {User }} = require('../db')

async function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log('Authorization Token:', token); 

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).send('Authorization token missing or malformed');
    }

    const splitToken = token.split(' ')[1]; 
    const user = await User.findByToken(splitToken);
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
