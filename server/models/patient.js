"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Patient.belongsTo(models.Time, {
                foreignKey: "TimeId",
            });
            Patient.belongsTo(models.Physiotherapy, {
                foreignKey: "PhysiotherapiesId",
            });
        }
    }
    Patient.init(
        {
            name: DataTypes.STRING,
            registrationNumber: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            TimeId: DataTypes.INTEGER,
            date: DataTypes.DATE,
            address: DataTypes.TEXT,
            status: DataTypes.STRING,
            PhysiotherapiesId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Patient",
        }
    );
    return Patient;
};
