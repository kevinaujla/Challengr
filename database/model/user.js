/*

user.js
user model/schema

*/

// model for users table
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    // default size for STRING is 255 bits
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // this location data will have to have a 
    // different data type at some point
    // location: DataTypes.STRING,
    // photo_url: DataTypes.STRING
  }, {
    // allows for underscore convention for auto generated properties
    underscore: true
  });
};
