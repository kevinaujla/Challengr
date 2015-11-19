/*

transaction.js
transaction model/schema

*/

// model for transaction table
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('transaction', {
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last4: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};
