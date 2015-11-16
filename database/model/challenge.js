/*

challenge.js
challenge model/schema

*/

// model for challenge table
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('challenge', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    charityAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    likes: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    expiresDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    issuedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    completedDate: DataTypes.DATE
  });
};
