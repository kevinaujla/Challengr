/*

database.js
sqlite database

*/

// ORM for interaction with SQL database
var sequelize = require('sequelize');

// instantiates a new Sequelize database
var db = new sequelize(
  // databasa username and password do not matter for sqlite
  'database',
  'username',
  'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: __dirname + '/data/db.sqlite'
  });

module.exports = db;
