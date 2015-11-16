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
    charity_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    denied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    not_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    likes: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    expires_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    issued_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    completed_date: DataTypes.DATE,
    accepted_date: DataTypes.DATE,
    denied_date: DataTypes.DATE
  }, {
    // allows for underscore convention for auto generated properties
    underscore: true
  });
};
