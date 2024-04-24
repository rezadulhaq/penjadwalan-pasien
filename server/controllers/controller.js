const { Package, Patient, Physiotherapy, Time } = require("../models/index");
const { Op } = require('sequelize');

class Controller {
    static async login(req, res, next) {
        try {
            const { username, passwords } = req.body;
            const data = await User.findOne({ where: { username } });
            if (!data) {
                throw `User not found`;
            }
            res.status(200).json("login berhasil");
        } catch (error) {
            next(error);
        }
    }

    static async register(req, res, next) {
        try {
            const {
                name,
                VotingPlaceId,
                nik,
                address,
                gender,
                phoneNumber,
                email,
                city,
                province,
                totalPoint,
                totalSupport,
            } = req.body;

            await User.create({
                name,
                VotingPlaceId,
                nik,
                address,
                gender,
                phoneNumber,
                email,
                city,
                province,
                totalPoint,
                totalSupport,
            });

            res.status(201).json(`relawan berhasil didaftarkan`);
        } catch (error) {
            next(error);
        }
    }

    ////////
    static async getAllPackage(req, res, next) {
        try {
            const data = await Package.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getPackageById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Package.findOne({ where: { id } });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async createPackage(req, res, next) {
        try {
            const { name, detail, rate } = req.body;
            await Package.create({
                name,
                detail,
                rate,
            });

            res.status(201).json(`Berhasil menambahkan doctor`);
        } catch (error) {
            next(error);
        }
    }

    static async updatePackage(req, res, next) {
        try {
            const { name, detail, rate } = req.body;
            const { id } = req.params;
            const check = await Package.findOne({ id });
            if (!check) {
                throw { name: "errorNotFound" };
            }

            await Package.update({
                name,
                detail,
                rate,
                where: { id },
            }); //tambahkan parameter lain
        } catch (error) {
            next(error);
        }
    }

    static async deletePackage(req, res, next) {
        //harusnya tidak dihapus tapi diubah statusnya saja
        try {
            const { id } = req.params;
            let data = await Package.findByPk(id);
            if (!data) throw { name: "errorNotFound" };
            await Package.destroy({
                where: { id },
            });
            res.status(200).json({ message: `${data.name} succes to delete` });
        } catch (error) {
            next(error);
        }
    }

    static async getAllTimes(req, res, next) {
        try {
            const data = await Time.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getAllFisio(req, res, next) {
        try {
            const data = await Physiotherapy.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getFisioById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Physiotherapy.findOne({ where: { id } });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async createFisio(req, res, next) {
        try {
            const { name, registrationNumber, phoneNumber } = req.body;
            const salary = 0;
            await Physiotherapy.create({
                name,
                registrationNumber,
                phoneNumber,
                salary,
            });

            res.status(201).json(`Berhasil menambahkan doctor`);
        } catch (error) {
            next(error);
        }
    }

    static async updateFisio(req, res, next) {
        try {
            const { name, registrationNumber, phoneNumber } = req.body;
            const { id } = req.params;
            const check = await Physiotherapy.findOne({ id });
            if (!check) {
                throw { name: "errorNotFound" };
            }

            await Physiotherapy.update({
                name,
                registrationNumber,
                phoneNumber,
                where: { id },
            }); //tambahkan parameter lain
        } catch (error) {
            next(error);
        }
    }

    static async deleteFisio(req, res, next) {
        //harusnya tidak dihapus tapi diubah statusnya saja
        try {
            const { id } = req.params;
            let data = await Physiotherapy.findByPk(id);
            if (!data) throw { name: "errorNotFound" };
            await Physiotherapy.destroy({
                where: { id },
            });
            res.status(200).json({ message: `${data.name} succes to delete` });
        } catch (error) {
            next(error);
        }
    }

    static async getAllPatient(req, res, next) {
        try {
            const data = await Patient.findAll();

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getAllPatientToday(req, res, next) {
        try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
            const data = await Time.findAll({
                include: {
                    model: Patient,
                    where: {
                        date: {
                            [Op.gte]: today,
                        },
                    },
                    include:{model: Physiotherapy,}
                }
            });

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getPatientById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Patient.findOne({ where: { id } });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async createPatient(req, res, next) {
        try {
            const {
                name,
                registrationNumber,
                phoneNumber,
                TimeId,
                date,
                address,
                status,
            } = req.body;

            await Patient.create({
                name,
                registrationNumber,
                phoneNumber,
                TimeId,
                date,
                address,
                status,
            });

            res.status(200).json(`Berhasil menambahkan pasien`);
        } catch (error) {
            next(error);
        }
    }

    static async updatePatient(req, res, next) {
        try {
            const {
                name,
                registrationNumber,
                phoneNumber,
                TimeId,
                date,
                address,
                status,
            } = req.body;
            const { id } = req.params;
            const check = await Patient.findOne({ id });
            if (!check) {
                throw { name: "errorNotFound" };
            }

            await Patient.update({
                name,
                registrationNumber,
                phoneNumber,
                TimeId,
                date,
                address,
                status,
                where: { id },
            }); //tambahkan parameter lain
        } catch (error) {
            next(error);
        }
    }

    static async deletePatient(req, res, next) {
        try {
            const { id } = req.params;
            let data = await Patient.findByPk(id);
            if (!data) throw { name: "errorNotFound" };
            await Patient.destroy({
                where: { id },
            });
            res.status(200).json({ message: `${data.name} succes to delete` });
        } catch (error) {
            next(error);
        }
    }

    // static async createAppointment(req, res, next) {
    //     try {
    //         const {
    //             DokterId,
    //             PasienId,
    //             status,
    //             complaint,
    //             diagnosis,
    //             treatmentDate,
    //         } = req.body;
    //         let totalCost = 0;
    //         await Timetable.create({
    //             DokterId,
    //             PasienId,
    //             status,
    //             complaint,
    //             diagnosis,
    //             treatmentDate,
    //         });

    //         res.status(200).json(`Berhasil menambahkan jadwal`);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // static async updateAppointment(req, res, next) {
    //     try {
    //         const {
    //             DokterId,
    //             PasienId,
    //             status,
    //             complaint,
    //             diagnosis,
    //             treatmentDate,
    //             totalCost,
    //         } = req.body;
    //         const { id } = req.params;
    //         const check = await Timetable.findOne({ id });

    //         if (!check) {
    //             throw { name: "errorNotFound" };
    //         }

    //         await Timetable.update({
    //             DokterId,
    //             PasienId,
    //             status,
    //             complaint,
    //             diagnosis,
    //             treatmentDate,
    //             totalCost,
    //             where: { id },
    //         }); //tambahkan parameter lain
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // static async deleteAppointment(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         let data = await Timetable.findByPk(id);
    //         if (!data) throw { name: "errorNotFound" };
    //         await Timetable.destroy({
    //             where: { id },
    //         });
    //         res.status(200).json({ message: `data succes to delete` });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

module.exports = Controller;
