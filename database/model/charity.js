/*

charity.js
charity model/schema

*/

// model for charity table
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('charity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    link: {
      type: DataTypes.STRING
    },
    imgUrl: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};
