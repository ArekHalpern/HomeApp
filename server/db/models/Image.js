const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
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
  }
});

module.exports = Image;
