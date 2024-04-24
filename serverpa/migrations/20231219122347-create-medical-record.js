'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "Patients",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      PhysioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "Physios",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      complaint: {
        type: Sequelize.TEXT
      },
      arrivalDate: {
        type: Sequelize.DATEONLY
      },
      diagnosis: {
        type: Sequelize.TEXT
      },
      intervention: {
        type: Sequelize.TEXT
      },
      timeSlot: {
        type: Sequelize.INTEGER
      },
      evaluation: {
        type: Sequelize.TEXT
      },
      paidStatus: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MedicalRecords');
  }
};