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
    FBid: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    },
    photoURL: {
      type: DataTypes.STRING,
      defaultValue: '/image/placeholder.png'
    }
  }, {
    timestamps: false
  });
};
