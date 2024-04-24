const express = require("express");
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/auth");
const user = express.Router();

user.post("/register", Controller.register); //v
user.post("/login", Controller.login); //v

user.get("/package", Controller.getAllPackage);
user.post("/package", Controller.createPackage);
user.get("/package/:id", Controller.getPackageById);
user.put("/package/:id", Controller.updatePackage);
user.delete("/package/:id", Controller.deletePackage);

user.get("/fisio", Controller.getAllFisio);
user.post("/fisio", Controller.createFisio);
user.get("/fisio/transaction/:id", Controller.getPhysioTransactionByPhysioId);
user.post("/fisio/transaction/:id/out", Controller.createFisio);
user.get("/fisio/:id", Controller.getFisioById);
user.put("/fisio/:id", Controller.updateFisio);
user.delete("/fisio/:id", Controller.deleteFisio);

user.get("/transaction", Controller.getAllTransaction);

user.get("/patient", Controller.getAllPatient);
user.post("/patient", Controller.createPatient);
user.get("/patient/:id", Controller.getPatientById);
user.put("/patient/:id", Controller.updatePatient);
user.delete("/patient/:id", Controller.deletePatient);

user.post("/patientmedicalrecord",Controller.createPatientMedicalRecord);

user.get("/medicalrecord", Controller.getAllMedicalRecord);
user.get("/medicalrecord/today", Controller.getAllMedicalRecordToday)
user.get("/medicalrecord/range", Controller.getMedicalRecordsByDateRange)
user.post("/medicalrecord", Controller.createMedicalRecord)
user.post("/medicalrecord/mr", Controller.createMedicalRecordByMRNumber)
user.get("/medicalrecord/patient/:id", Controller.getAllMedicalRecordPatientId);
user.post("/medicalrecord/:id", Controller.createMedicalRecordPatientId);
user.get("/medicalrecord/:id", Controller.getMedicalRecordById);
user.put("/medicalrecord/:id", Controller.updateMedicalRecordById);
user.patch("/medicalrecord/:id", Controller.updatePaidStatusMedicalRecordById);
user.delete("/medicalrecord/:id", Controller.deleteMedicalRecord);

user.get("/rekapbulanan/:year", Controller.getRekapBulanan)
// user.use(authentication);
module.exports = user;
