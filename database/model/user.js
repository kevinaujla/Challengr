/*

user.js
user model/schema

*/

// model for users table
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    // allows for underscore convention for auto generated properties
    underscore: true
  });
};
