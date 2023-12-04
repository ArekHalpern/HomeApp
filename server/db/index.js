//access point for database

const db = require('./db')

const User = require('./models/User')
const Image = require('./models/Image')

//associations

module.exports = {
  db,
  models: {
    User,
    Image
  },
}
