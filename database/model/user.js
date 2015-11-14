/*

user.js
user model/schema

*/

// model for users table
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    // allows for underscore convention for auto generated properties
    underscore: true
  });
};
