/*

database.js
sqlite database

*/

// ORM for interaction with SQL database
var sequelize = require('sequelize');

// instantiates a new Sequelize database
var db = new sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 2,
      idle: 100000
    },
    logging: false
  });
require(__dirname + '/configDatabase.js')(db);

module.exports = db;
