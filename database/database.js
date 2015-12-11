/*

database.js
sqlite database

*/

// ORM for interaction with SQL database
var sequelize = require('sequelize');

// instantiates a new Sequelize database
var db = new sequelize(
  // database username and password do not matter for sqlite
  'database',
  'username',
  'password', {
    host: 'localhost',
    dialect: 'sqlite',
    // the pool size depends on the load the database has to handle
    pool: {
      max: 10,
      min: 2,
      idle: 100000
    },
    storage: __dirname + '/data/db.sqlite',
    logging: false
  });
require(__dirname + '/configDatabase.js')(db);

module.exports = db;
