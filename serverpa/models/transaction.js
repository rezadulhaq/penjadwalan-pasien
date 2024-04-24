'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Wallet, {foreignKey:"WalletId"})
    }
  }
  Transaction.init({
    WalletId: DataTypes.INTEGER,
    totalTransaction: DataTypes.INTEGER,
    status: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};