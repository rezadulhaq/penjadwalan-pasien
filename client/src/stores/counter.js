import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl = 'https://re-covery-production.up.railway.app/user'
// const baseUrl = 'http:localhost:3000/user'
export const useCounterStore = defineStore('counter', {
  state() {
    return {
      fisio: [],
      today: [],
      mrecord: [],
      mr: {},
      patient: {},
      patients: [],
      product: {},
      isLogin: false,
      name: '',
      province: [],
      city: [],
      cost: {},
      order: [],
      page: '',
      totalPage: ''
    }
  },
  actions: {
    clearCost() {
      this.cost = {}
    },
    async register(user) {
      try {
        await axios({
          method: 'post',
          url: baseUrl + '/register',
          data: user
        })
        this.router.push('/login')
        Swal.fire({
          title: 'Register Berhasil'
        })
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async login(user) {
      try {
        const { data } = await axios({
          method: 'post',
          url: baseUrl + '/login',
          data: user
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('name', data.name)
        this.name = localStorage.getItem('name')
        this.isLogin = true
        this.router.push('/')
        // console.log("berhasil login");
        Swal.fire({
          title: 'Login Berhasil'
        })
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async logout() {
      try {
        localStorage.clear()
        this.isLogin = false
        this.router.push('/login')
        Swal.fire({
          title: 'Log Out Berhasil'
        })
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async fetchProducts(pageNow = 1) {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/?page[size]=5&page[number]=' + pageNow
        })
        this.products = data.data
        this.totalPage = data.totalPage
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async fetchProductId(id) {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/detail/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.product = data
        // console.log(this.oneNews);
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },

    async fetchPhysio() {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/fisio'
          // headers: {
          //   access_token: localStorage.access_token,
          // },
        })
        this.fisio = data
        // console.log(data);
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },

    async fetchPatients() {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/patient'
          // headers: {
          //   access_token: localStorage.access_token,
          // },
        })
        this.patients = data
        // console.log(data);
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async fetchAllMedicalRecord() {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/medicalrecord'
          // headers: {
          //   access_token: localStorage.access_token,
          // },
        })
        this.mrecord = data
        console.log(data)
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },

    async updatePaidStatusMedicalRecordById(id){
      try {
        // console.log(medicalRecord, id, '<<<<<<<<<')
        const { data } = await axios.patch(baseUrl + '/medicalrecord' + `/${id}`)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Update Status Pembayaran Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async fetchMedicalRecordsByDate(date) {
      try {
        const startDate = date.startDate
        const endDate = date.endDate

        const queryParams = new URLSearchParams()
        queryParams.append('startDate', startDate)
        queryParams.append('endDate', endDate)

        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/medicalrecord/range?${queryParams.toString()}`
          // headers: {
          //   access_token: localStorage.access_token,
          // },
        })

        this.mrecord = data
        console.log(data)
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },

    async fetchDetailMedicalRecord(id) {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + `/medicalrecord/${id}`
          // headers: {
          //   access_token: localStorage.access_token,
          // },
        })
        this.mr = data
        console.log(data)
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },

    async fetchToday(selectedDate) {
      try {
        if (!selectedDate) {
          const { data } = await axios({
            method: 'get',
            url: baseUrl + `/medicalrecord/today`
            // params: {
            //   date: selectedDate // Mengirimkan tanggal sebagai parameter
            // }
          })
          this.today = data
          console.log(data, '<<<<<<<<<<<<<<<<<<<<<<')
        } else {
          const { data } = await axios({
            method: 'get',
            url: baseUrl + `/medicalrecord/today?date=${selectedDate}`
            // params: {
            //   date: selectedDate // Mengirimkan tanggal sebagai parameter
            // }
          })
          this.today = data
          // console.log(data)
        }
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },

    async fetchDetailPatient(id) {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + `/patient/${id}`
          // headers: {
          //   access_token: localStorage.access_token,
          // },
        })
        this.patient = data
        console.log(this.patient)
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async addPatient(patientData) {
      try {
        const { data } = await axios.post(baseUrl + '/patient', patientData)
        // Lakukan sesuatu dengan respons jika diperlukan
        console.log(data)
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Pendaftaran Pasien Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async addFisio(fisioData) {
      try {
        const { data } = await axios.post(baseUrl + '/fisio', fisioData)
        // Lakukan sesuatu dengan respons jika diperlukan
        console.log(data)
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Pendaftaran Fisio Berhasil'
        })
      } catch (error) {
        console.log(error, '<<<<<<<<<<<<<<<')
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan Fisio')
      }
    },

    async editFisio(fisioData, id){
      try {
        const { data } = await axios.put(baseUrl + `/fisio/${id}`, fisioData)
        // Lakukan sesuatu dengan respons jika diperlukan
        console.log(data)
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Edit Fisio Berhasil'
        })
      } catch (error) {
        throw new Error('Gagal mengedit Fisio')
      }
    },

    async deleteFisio(id){
      try {
        console.log(id, '<<<<<<<<<')
        await axios.delete(baseUrl + '/fisio' + `/${id}`)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Delete Fisio Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal delete fisio')
      }
    },

    async addMedicalRecord(medicalRecord) {
      try {
        console.log(medicalRecord, '<<<<<<<<<')
        const { data } = await axios.post(baseUrl + '/medicalrecord', medicalRecord)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Pendaftaran Pasien Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async addMedicalRecordMR(medicalRecord) {
      try {
        console.log(medicalRecord, '<<<<<<<<<')
        const { data } = await axios.post(baseUrl + '/medicalrecord/mr', medicalRecord)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Pendaftaran Pasien Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async editMedicalRecord(medicalRecord, id) {
      try {
        console.log(medicalRecord, id, '<<<<<<<<<')
        const { data } = await axios.put(baseUrl + '/medicalrecord' + `/${id}`, medicalRecord)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Edit Medical Record Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async editMedicalRecord(medicalRecord, id) {
      try {
        console.log(medicalRecord, id, '<<<<<<<<<')
        const { data } = await axios.put(baseUrl + '/medicalrecord' + `/${id}`, medicalRecord)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Edit Medical Record Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async deleteMedicalRecord(id) {
      try {
        console.log(id, '<<<<<<<<<')
        await axios.delete(baseUrl + '/medicalrecord' + `/${id}`)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Delete Medical Record Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async addPatientMedicalRecord(patient) {
      try {
        const { data } = await axios.post(baseUrl + '/patientmedicalrecord', patient)
        // Lakukan sesuatu dengan respons jika diperlukan
        // Jika perlu memperbarui data setelah menambahkan pasien, panggil metode lain di sini
        // this.fetchAllMedicalRecord();
        Swal.fire({
          title: 'Pendaftaran Pasien dan MedicalRecord Berhasil'
        })
      } catch (error) {
        console.error(error.response.data.message)
        throw new Error('Gagal menambahkan pasien')
      }
    },

    async fetchCategoriesById(id) {
      // console.log(id);
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/categories/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.products = data.Products
        // console.log(data);
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async getProvince() {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/province',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.province = data.data
        // console.log(data.data);
      } catch (error) {
        // console.log(error);
        Swal.fire(error.response.data.message)
      }
    },
    async getCity(provinceId) {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/city/' + provinceId,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.city = data.data
      } catch (error) {
        // console.log(error);
        Swal.fire(error.response.data.message)
      }
    },

    async getCost(cityId) {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/cost?destination=' + cityId,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.cost = data
      } catch (error) {
        // console.log(error);
        Swal.fire(error.response.data.message)
      }
    },

    async createOrders(id) {
      try {
        const { data } = await axios({
          method: 'post',
          url: baseUrl + '/buy/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.router.push('/')
      } catch (error) {
        // console.log(error);
        Swal.fire(error.response.data.message)
      }
    },

    async payment(harga, id) {
      try {
        const { data } = await axios({
          method: 'post',
          url: baseUrl + '/generate-midtrans-token?cost=' + harga,
          headers: {
            access_token: localStorage.access_token
          }
        })
        const cb = this.createOrders
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            cb(id)
            // alert("payment success!");
            swall.fire('payment success!')
            // console.log(result);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            // alert("wating your payment!");
            swall.fire('wating your payment!')
            // console.log(result);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            // alert("payment failed!");
            swall.fire('payment failed!')
            // console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            Swal.fire('you closed the popup without finishing the payment')
            // alert("you closed the popup without finishing the payment");
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getOrder() {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/order',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.order = data
      } catch (error) {
        // console.log(error);
        Swal.fire(error.response.data.message)
      }
    }
  }
})
