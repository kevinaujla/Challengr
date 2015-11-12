/*

database.js
sqlite database

*/

// ORM for interaction with SQL database
var sequelize = require('sequelize');

// instantiates a new Sequelize database
var db = new sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: '/database/db.sqlite'
});

module.exports = db;