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
    // the pool size depends on the load the database has to handle
    // as long as this is sqlite the number can be marginally small
    pool: {
      max: 10,
      min: 2,
      // milliseconds being idle before released
      idle: 100000
    },
    storage: __dirname + '/data/db.sqlite'
  });

db.sync()
  .then(function successCallback() {
    console.log('database is up and running');
    db.User = db.import(__dirname + '/model/user.js');
    db.Challenge = db.import(__dirname + '/model/challenge.js');

    db.User.hasMany(db.Challenge, {
      as: 'MyChallenges',
      foreignKey: 'challengerUser'
    });
    db.Challenge.belongsTo(db.User, {
      as: 'Challenger'
    });
    db.User.hasMany(db.Challenge, {
      as: 'ImposedChallenges',
      foreignKey: 'challengedUser'
    });
    db.Challenge.belongsTo(db.User, {
      as: 'Challenged'
    });

    db.sync()
      .then(function successCallback() {
        console.log('synced database models');
      });
  });

module.exports = db;
