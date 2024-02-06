const Sequelize = require('sequelize')
const pkg = require('../../package.json')
require('dotenv').config();

console.log('Initializing database configuration...');

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '_test' : '');

console.log(`Database Name: ${databaseName}`);

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging;
  console.log('Logging is enabled for Sequelize.');
}

if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
  console.log('SSL configuration is enabled for database connection.');
}

console.log('Connecting to database...');
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)
  
console.log('Database connection successfully established.');

module.exports = db
