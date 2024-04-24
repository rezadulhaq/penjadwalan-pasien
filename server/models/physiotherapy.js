'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Physiotherapy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Physiotherapy.hasMany(models.Patient, {
        foreignKey: "PhysiotherapiesId",
    });
    }
  }
  Physiotherapy.init({
    name: DataTypes.STRING,
    registrationNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    salary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Physiotherapy',
  });
  return Physiotherapy;
};