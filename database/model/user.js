/*

user.js
user model/schema

*/

// model for users table
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    // default size for STRING is 255 bits
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // this location data will have to have a 
    // different data type at some point
    // location: DataTypes.STRING,
    // photo_url: DataTypes.STRING
  });
};
