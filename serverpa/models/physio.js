'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Physio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Physio.hasMany(models.MedicalRecord, {foreignKey:"PhysioId"})
      Physio.hasOne(models.Wallet, {foreignKey:"PhysioId"})
    }
  }
  Physio.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phoneNumber: DataTypes.STRING,
    totalIncome: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Physio',
  });
  return Physio;
};