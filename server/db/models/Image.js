const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  // Existing fields
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  filePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id',      
    },
  }
});

module.exports = Image;

