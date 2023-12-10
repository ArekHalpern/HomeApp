//access point for database

const db = require('./db')

const User = require('./models/User')
const Image = require('./models/Image')

//associations
User.hasMany(Image)
Image.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Image
  },
}
