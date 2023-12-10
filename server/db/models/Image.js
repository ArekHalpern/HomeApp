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
    allowNull: true,
  },
  urlPath: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.filePath}`;
    },
    allowNull: true,
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

