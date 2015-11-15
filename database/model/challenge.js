/*

challenge.js
challenge model/schema

*/

// model for challenge table
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('challenge', {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    description DataTypes.STRING,
    charity_amount: DataTypes.DECIMAL(10, 2),
    accepted: DataTypes.BOOLEAN,
    denied: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN,
    not_completed: DataTypes.BOOLEAN,
    likes: DataTypes.BIGINT,
    expires: DataTypes.DATE,
    issued: DataTypes.DATE,
    completed: DataTypes.DATE,
    accepted: DataTypes.DATE,
    denied: DataTypes.DATE
  }, {
    // allows for underscore convention for auto generated properties
    underscore: true
  });
};
