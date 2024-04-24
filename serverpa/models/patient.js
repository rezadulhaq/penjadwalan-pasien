'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.MedicalRecord, {foreignKey:"PatientId"})
    }
  }
  Patient.init({
    medicalRecordNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.TEXT,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    placeOfBirth: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    occupation: DataTypes.TEXT,
    ticket: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};