const {
    User,
    Package,
    Patient,
    Physio,
    Wallet,
    Transaction,
    MedicalRecord,
    sequelize,
    Sequelize,
} = require("../models/index");
const { Op, where, fn, col } = require("sequelize");
const { hashPassword, compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class Controller {
    // user
    static async register(req, res, next) {
        try {
            const {
                name,
                username,
                email,
                password,
                phoneNumber,
                address,
                role,
            } = req.body;
            const check = await User.findOne({ where: { username } });
            if (check) {
                throw "username sudah terdaftar";
            }

            const check2 = await User.findOne({ where: { email } });
            if (check2) {
                throw "email sudah terdaftar";
            }

            const check3 = await User.findOne({ where: { phoneNumber } });
            if (check3) {
                throw "nomor telepon sudah terdaftar";
            }
            await User.create({
                name,
                username,
                email,
                password,
                phoneNumber,
                address,
                role,
            });
            res.status(201).json(`Register berhasil`);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            console.log(req.body);
            if (!username) {
                throw { name: "UsernameOrPasswordRequired" };
            }
            if (!password) {
                throw { name: "UsernameOrPasswordRequired" };
            }

            let user = await User.findOne({
                where: { username },
            });

            if (!user) {
                throw { name: "InvalidCredentials" };
            }

            let compared = compareHash(password, user.password);

            if (!compared) {
                throw { name: "InvalidCredentials" };
            }

            let payload = {
                username: user.username,
                role: user.role,
            };

            let access_token = createToken(payload);
            res.status(200).json({
                access_token,
                username: user.username,
                role: user.role,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // package
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
            const { name, description, price, ticket } = req.body;
            await Package.create({
                name,
                description,
                price,
                ticket,
            });

            res.status(201).json(`Berhasil menambahkan paket`);
        } catch (error) {
            next(error);
        }
    }

    static async updatePackage(req, res, next) {
        try {
            const { name, description, price, ticket } = req.body;
            const { id } = req.params;
            const check = await Package.findOne({ where: { id } });
            if (!check) {
                throw { name: "errorNotFound" };
            }

            await Package.update(
                {
                    name,
                    description,
                    price,
                    ticket,
                },
                { where: { id } }
            ); //tambahkan parameter lain

            res.status(201).json("berhasil update");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deletePackage(req, res, next) {
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

    // fisio

    static async getAllFisio(req, res, next) {
        try {
            const data = await Physio.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getFisioById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Physio.findOne({ where: { id } });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async createFisio(req, res, next) {
        try {
            const { name, address, phoneNumber } = req.body;
            const balance = 0;
            const totalIncome = 0;
            const data = await Physio.create({
                name,
                address,
                phoneNumber,
                totalIncome,
            });

            await Wallet.create({ balance, PhysioId: data.id });

            res.status(201).json(`Berhasil menambahkan Physio`);
        } catch (error) {
            next(error);
        }
    }

    static async updateFisio(req, res, next) {
        try {
            const { name, address, phoneNumber } = req.body;
            const { id } = req.params;
            const check = await Physio.findOne({ where: { id } });
            if (!check) {
                throw { name: "errorNotFound" };
            }

            await Physio.update(
                {
                    name,
                    address,
                    phoneNumber,
                },
                { where: { id } }
            ); //tambahkan parameter lain

            res.status(201).json("Data fisio berhasil di update");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteFisio(req, res, next) {
        //harusnya tidak dihapus tapi diubah statusnya saja
        try {
            const { id } = req.params;
            let data = await Physio.findByPk(id);
            if (!data) throw { name: "errorNotFound" };
            await Physio.destroy({
                where: { id },
            });
            res.status(200).json({
                message: `Physio ${data.name} succes to delete`,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPhysioTransactionByPhysioId(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Wallet.findAll({
                where: { PhysioId: id },
                include: [{ model: Transaction }],
            });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getAllTransaction(req, res, next) {
        try {
            const data = await Transaction.findAll();

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    // patient

    static async getAllPatient(req, res, next) {
        try {
            const data = await Patient.findAll();

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getPatientById(req, res, next) {
        try {
            const { id } = req.params;

            const data = await Patient.findOne({
                where: { id },
                include: [
                    { model: MedicalRecord, include: [{ model: Physio }] },
                ],
            });

            res.status(200).json(data);
        } catch (error) {
            console.log(error, "<<<<<<<<<");
            next(error);
        }
    }

    static async createPatient(req, res, next) {
        try {
            const {
                medicalRecordNumber,
                name,
                gender,
                address,
                email,
                phoneNumber,
                city,
                placeOfBirth,
                dateOfBirth,
                occupation,
            } = req.body;
            const ticket = 0;
            const data = await Patient.create({
                medicalRecordNumber,
                name,
                gender,
                address,
                email,
                phoneNumber,
                city,
                placeOfBirth,
                dateOfBirth,
                occupation,
                ticket,
            });

            // sekalian create RM dan transaksi physio nambah saldo

            res.status(201).json("Berhasil mendaftarkan pasien");
        } catch (error) {
            next(error);
        }
    }

    static async updatePatient(req, res, next) {
        try {
            const { id } = req.params;
            const {
                medicalRecordNumber,
                name,
                gender,
                address,
                email,
                phoneNumber,
                city,
                placeOfBirth,
                dateOfBirth,
                occupation,
            } = req.body;
            const ticket = 0;
            const data = await Patient.create(
                {
                    medicalRecordNumber,
                    name,
                    gender,
                    address,
                    email,
                    phoneNumber,
                    city,
                    placeOfBirth,
                    dateOfBirth,
                    occupation,
                    ticket,
                },
                { where: { id } }
            );

            res.status(201).json("Berhasil mendaftarkan pasien");
        } catch (error) {
            next(error);
        }
    }

    static async deletePatient(req, res, next) {
        try {
            const { id } = req.params;

            await Patient.destroy({ where: { id } });

            res.status(200).json("Pasien berhasil dihapus");
        } catch (error) {
            next(error);
        }
    }

    // medical record

    static async getAllMedicalRecord(req, res, next) {
        try {
            const data = await MedicalRecord.findAll({
                include: [{ model: Physio }, { model: Patient }],
            });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getMedicalRecordsByDateRange(req, res, next) {
        try {
            let { startDate, endDate } = req.query;
            startDate = new Date(startDate)
            endDate = new Date(endDate)
            if (!startDate || !endDate) {
                return res.status(400).json({ error: 'Both start date and end date are required.' });
            }
    
            const data = await MedicalRecord.findAll({
                include: [{ model: Physio }, { model: Patient }],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });
    
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getAllMedicalRecordToday(req, res, next) {
        try {
            // Ambil tanggal dari query parameter jika ada
            const { date } = req.query;

            // Buat objek where untuk penyaringan berdasarkan tanggal jika tanggal diberikan
            let where = date
                ? { arrivalDate: { [Op.eq]: new Date(date) } }
                : { arrivalDate: { [Op.eq]: new Date() } };

            const data = await MedicalRecord.findAll({
                where,
                include: [{ model: Physio }, { model: Patient }],
            });
            // console.log(data, "<<<<<<<<<<<<<<<<<<<<<<<");
            res.status(200).json(data);
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async getAllMedicalRecordPatientId(req, res, next) {
        try {
            const { id } = req.params;

            const data = await MedicalRecord.findAll({
                where: { PatientId: id },
            });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getMedicalRecordById(req, res, next) {
        try {
            const { id } = req.params;

            const data = await MedicalRecord.findOne({
                where: { id },
                include: [{ model: Physio }, { model: Patient }],
            });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async createMedicalRecord(req, res, next) {
        try {
            const {
                PatientId,
                PhysioId,
                complaint,
                arrivalDate,
                diagnosis,
                intervention,
                timeSlot,
                evaluation,
                
            } = req.body;
            const paidStatus = false
            // Memastikan arrivalDate tidak kurang dari hari ini
            // const today = new Date();
            // const selectedDate = new Date(arrivalDate);

            // if (selectedDate < today) {
            //     throw "arrivalDate tidak boleh kurang dari hari ini";
            // } else {
                await MedicalRecord.create({
                    PatientId,
                    PhysioId,
                    complaint,
                    arrivalDate,
                    diagnosis,
                    intervention,
                    timeSlot,
                    evaluation,
                    paidStatus,
                });

                res.status(201).json("Berhasil menambahkan medical record");
            // }
        } catch (error) {
            next(error);
        }
    }

    static async createMedicalRecordByMRNumber(req, res, next) {
        try {
            const {
                medicalRecordNumber,
                PhysioId,
                complaint,
                arrivalDate,
                diagnosis,
                intervention,
                timeSlot,
                evaluation,
                
            } = req.body;

            const data = await Patient.findOne({where:{medicalRecordNumber}})
            const paidStatus = false
            console.log(data, "<<<<<<<<<<<");
                await MedicalRecord.create({
                    PatientId:data.id,
                    PhysioId,
                    complaint,
                    arrivalDate,
                    diagnosis,
                    intervention,
                    timeSlot,
                    evaluation,
                    paidStatus,
                });

                res.status(201).json("Berhasil menambahkan medical record");
            // }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async createPatientMedicalRecord(req, res, next) {
        try {
            const {
                medicalRecordNumber,
                name,
                gender,
                address,
                email,
                phoneNumber,
                city,
                placeOfBirth,
                dateOfBirth,
                occupation,
                PhysioId,
                complaint,
                arrivalDate,
                diagnosis,
                intervention,
                timeSlot,
                evaluation,
                
            } = req.body;
            const paidStatus = false
            const ticket = 0;
            const data = await Patient.create({
                medicalRecordNumber,
                name,
                gender,
                address,
                email,
                phoneNumber,
                city,
                placeOfBirth,
                dateOfBirth,
                occupation,
                ticket,
            });

            const PatientId = data.id;
            // console.log(data, "yyyyyyyyyyyyy");

            const today = new Date();
            const selectedDate = new Date(arrivalDate);

            // if (selectedDate < today) {
            //     throw "arrivalDate tidak boleh kurang dari hari ini";
            // } else {
                await MedicalRecord.create({
                    PatientId:+PatientId,
                    PhysioId:+PhysioId,
                    complaint,
                    arrivalDate,
                    diagnosis,
                    intervention,
                    timeSlot:timeSlot,
                    evaluation,
                    paidStatus,
                });

                res.status(201).json(
                    "Berhasil menambahkan pasien dan medical record"
                );
            // }
        } catch (error) {
            console.log(error, "<<<<<<<<");
            next(error);
        }
    }

    static async createMedicalRecordPatientId(req, res, next) {
        try {
            const { id } = req.params;

            const {
                PhysioId,
                complaint,
                arrivalDate,
                diagnosis,
                intervention,
                timeSlot,
                evaluation,
                
            } = req.body;

            const paidStatus = false
            const today = new Date();
            const selectedDate = new Date(arrivalDate);

            if (selectedDate < today) {
                throw "arrivalDate tidak boleh kurang dari hari ini";
            } else {
                await MedicalRecord.create({
                    PatientId: id,
                    PhysioId,
                    complaint,
                    arrivalDate,
                    diagnosis,
                    intervention,
                    timeSlot,
                    evaluation,
                    paidStatus,
                });

                res.status(201).json("Berhasil menambahkan medical record");
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateMedicalRecordById(req, res, next) {
        try {
            const { id } = req.params;

            const {
                PhysioId,
                complaint,
                arrivalDate,
                diagnosis,
                intervention,
                timeSlot,
                evaluation,
            } = req.body;

            await MedicalRecord.update(
                {
                    PhysioId,
                    complaint,
                    arrivalDate,
                    diagnosis,
                    intervention,
                    timeSlot,
                    evaluation,
                },
                { where: { id } }
            );

            res.status(201).json("Berhasil update medical record");
        } catch (error) {
            next(error);
        }
    }

    static async updatePaidStatusMedicalRecordById(req, res, next) {
        try {
            const { id } = req.params;

            const paidStatus = true;

            await MedicalRecord.update({ paidStatus }, { where: { id } });

            res.status(201).json(
                "Paid status berhasil idupdate pada medical record"
            );
        } catch (error) {
            next(error);
        }
    }

    static async deleteMedicalRecord(req, res, next) {
        try {
            const { id } = req.params;

            await MedicalRecord.destroy({ where: { id } });

            res.status(200).json("Medical record berhasil di hapus");
        } catch (error) {
            next(error);
        }
    }

    static async getRekapBulanan(req, res, next) {
        try {
            const selectedYear = parseInt(req.params.year);

            const result = await MedicalRecord.findAll({
                attributes: [
                    [
                        sequelize.literal(
                            'EXTRACT(MONTH FROM "arrivalDate")::INTEGER'
                        ),
                        "month",
                    ],
                    [sequelize.fn("COUNT", sequelize.col("id")), "total"],
                ],
                where: sequelize.where(
                    sequelize.literal('EXTRACT(YEAR FROM "arrivalDate")'),
                    selectedYear
                ),
                group: [sequelize.literal('EXTRACT(MONTH FROM "arrivalDate")')],
                order: [sequelize.literal('EXTRACT(MONTH FROM "arrivalDate")')],
                raw: true,
            });

            const rekapData = Array.from({ length: 12 }, (_, index) => {
                const monthData = result.find(
                    (item) => item.month === index + 1
                );
                return monthData ? parseInt(monthData.total, 10) : 0;
            });

            res.status(200).json({ year: selectedYear, data: rekapData });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    // static async getAllPatientToday(req, res, next) {
    //     try {
    //         const today = new Date();

    //         res.status(200).json(data);
    //     } catch (error) {
    //         console.log(error);
    //         next(error);
    //     }
    // }

    // static async getPatientById(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         const data = await Patient.findOne({ where: { id } });
    //         res.status(200).json(data);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // static async createPatient(req, res, next) {
    //     try {
    //         const {
    //             name,
    //             registrationNumber,
    //             phoneNumber,
    //             TimeId,
    //             date,
    //             address,
    //             status,
    //         } = req.body;

    //         await Patient.create({
    //             name,
    //             registrationNumber,
    //             phoneNumber,
    //             TimeId,
    //             date,
    //             address,
    //             status,
    //         });

    //         res.status(200).json(`Berhasil menambahkan pasien`);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // static async updatePatient(req, res, next) {
    //     try {
    //         const {
    //             name,
    //             registrationNumber,
    //             phoneNumber,
    //             TimeId,
    //             date,
    //             address,
    //             status,
    //         } = req.body;
    //         const { id } = req.params;
    //         const check = await Patient.findOne({ id });
    //         if (!check) {
    //             throw { name: "errorNotFound" };
    //         }

    //         await Patient.update({
    //             name,
    //             registrationNumber,
    //             phoneNumber,
    //             TimeId,
    //             date,
    //             address,
    //             status,
    //             where: { id },
    //         }); //tambahkan parameter lain
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // static async deletePatient(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         let data = await Patient.findByPk(id);
    //         if (!data) throw { name: "errorNotFound" };
    //         await Patient.destroy({
    //             where: { id },
    //         });
    //         res.status(200).json({ message: `${data.name} succes to delete` });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

module.exports = Controller;
