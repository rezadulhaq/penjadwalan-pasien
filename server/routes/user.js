const express = require("express");
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/auth");
const user = express.Router();

user.post("/register", Controller.register);
user.post("/login", Controller.login);

user.get("/fisio", Controller.getAllFisio);
user.post("/fisio", Controller.createFisio);
user.get("/fisio/:id", Controller.getFisioById);
user.put("/fisio/:id", Controller.updateFisio);
user.delete("/fisio/:id", Controller.deleteFisio);

user.get("/times", Controller.getAllTimes);

user.get("/package", Controller.getAllPackage);
user.post("/package", Controller.createPackage);
user.get("/package/:id", Controller.getPackageById);
user.put("/package/:id", Controller.updatePackage);
user.delete("/package/:id", Controller.deletePackage);
// user.put("/specialist/:id", Controller.up);
// user.delete("/specialist/:id", Controller.);

user.get("/patient", Controller.getAllPatient);
user.get("/patienttoday", Controller.getAllPatientToday);

user.post("/patient", Controller.createPatient);
user.get("/patient/:id", Controller.getPatientById);
user.put("/patient/:id", Controller.updatePatient);
user.delete("/patient/:id", Controller.deletePatient);

user.use(authentication);
// post order praktek
module.exports = user;
