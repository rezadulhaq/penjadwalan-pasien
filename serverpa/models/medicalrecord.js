'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalRecord.belongsTo(models.Patient, {foreignKey:"PatientId"})
      MedicalRecord.belongsTo(models.Physio, {foreignKey:"PhysioId"})
    }
  }
  MedicalRecord.init({
    PatientId: DataTypes.INTEGER,
    PhysioId: DataTypes.INTEGER,
    complaint: DataTypes.TEXT,
    arrivalDate: DataTypes.DATEONLY,
    diagnosis: DataTypes.TEXT,
    intervention: DataTypes.TEXT,
    timeSlot: DataTypes.INTEGER,
    evaluation: DataTypes.TEXT,
    paidStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MedicalRecord',
  });
  return MedicalRecord;
};