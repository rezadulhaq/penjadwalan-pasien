<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'Schedule',
  data() {
    return {
      showCancelConfirmationModalFisio:false,
      showModal: false,
      showModalEdit: false,
      showEditForm: false,
      showCancelConfirmationModal: false,
      selectedPatient: '',
      selectedFisio: null,
      showModalStatus: false,
      modalStatusText: '',
      selectedDate: new Date(),
      patientType: '',
      defaultTimeSlot: '',
      clickedHour: '',
      mrId: '',
      newFormData: {
        medicalRecordNumber: '',
        name: '',
        gender: '',
        address: '',
        email: '',
        phoneNumber: '',
        city: '',
        placeOfBirth: '',
        dateOfBirth: '',
        occupation: '',
        PhysioId: '',
        complaint: '',
        arrivalDate: '',
        diagnosis: '',
        intervention: '',
        timeSlot: '',
        evaluation: '',
        paidStatus: ''
      },
      formData: {
        medicalRecordNumber:'',
        PatientId: '',
        PhysioId: '',
        complaint: '',
        arrivalDate: '',
        diagnosis: '',
        intervention: '',
        timeSlot: '',
        evaluation: '',
        paidStatus: ''
      },
      formFisio: {
        name: '',
        address: '',
        phoneNumber: ''
      },
      schedule: [
        { time: 8, hour: '08.00', data: [] },
        { time: 9, hour: '09.00', data: [] },
        { time: 10, hour: '10.00', data: [] },
        { time: 11, hour: '11.00', data: [] },
        { time: 12, hour: '12.00', data: [] },
        { time: 13, hour: '13.00', data: [] },
        { time: 14, hour: '14.00', data: [] },
        { time: 15, hour: '15.00', data: [] },
        { time: 16, hour: '16.00', data: [] },
        { time: 17, hour: '17.00', data: [] },
        { time: 18, hour: '18.00', data: [] },
        { time: 19, hour: '19.00', data: [] },
        { time: 20, hour: '20.00', data: [] }
      ]
    }
  },
  mounted() {
    this.fetchToday(this.selectedDate)
    this.updateScheduleData()
    this.fetchPhysio()
    console.log('dari khairil', this.today)
  },
  computed: {
    ...mapState(useCounterStore, ['today', 'fisio', 'patients'])
  },
  
  methods: {
    ...mapActions(useCounterStore, [
      'fetchToday',
      'fetchPhysio',
      'fetchPatients',
      'addMedicalRecord',
      'addPatientMedicalRecord',
      'editMedicalRecord',
      'deleteMedicalRecord',
      'updatePaidStatusMedicalRecordById',
      'editFisio',
      'deleteFisio',
      'addMedicalRecordMR'
    ]),

    handleFisioNameClick(fisio) {
      this.selectedFisio = fisio
    },

    closeFisioModal() {
      this.selectedFisio = null
    },

    editFisioForm() {
      this.showEditForm = true
      console.log('berjalan disini', this.selectedFisio, this.showEditForm)
    },

    confirmDeleteFisio() {
      this.showCancelConfirmationModalFisio = true
    },

    async deleteFisiotherapy() {
      await this.deleteFisio(this.selectedFisio.id)
        .then(() => {
          this.closeFisioModal()
          this.showCancelConfirmationModalFisio = false
          // this.showEditForm = false
          this.updateScheduleData()
          this.fetchToday()
        })
        .catch((error) => {
          console.error('Error update fisio:', error)
        })

      await Promise.all([this.fetchToday(), this.fetchPhysio(), this.fetchPatients()])
      // this.updateScheduleData()
      // this.closeFisioModal()
    },

    toggleCancelConfirmationModal() {
      this.showCancelConfirmationModal = false
    },

    toggleCancelConfirmationModalFisio() {
      this.showCancelConfirmationModalFisio = false
    },

    async handleFormEditSubmit() {
      await this.editMedicalRecord(this.formData, this.mrId)
        .then(() => {
          this.showModalEdit = false
          this.showModalStatus = false
          // this.showModalEdit = false
          this.updateScheduleData()
          this.fetchToday()
        })
        .catch((error) => {
          console.error('Error adding new patient:', error)
        })

        await Promise.all([this.fetchToday(), this.fetchPhysio(), this.fetchPatients()])
      this.updateScheduleData()
    },

    handleEditClick() {
      this.showModalEdit = true
    },

    handleDeleteClick() {
      this.showCancelConfirmationModal = true
      this.showModalStatus = false
    },
    async saveFisioChanges() {
      await this.editFisio(this.formFisio, this.selectedFisio.id)
        .then(() => {
          this.closeFisioModal()
          this.showEditForm = false
          this.updateScheduleData()
          this.fetchToday()
        })
        .catch((error) => {
          console.error('Error update fisio:', error)
        })

      await Promise.all([this.fetchToday(), this.fetchPhysio(), this.fetchPatients()])
      this.updateScheduleData()
    },
    async handleUpdatePaidStatus() {
      console.log(this.mrId, 'LLLLLLLLLLLLLLLLLLL')
      await this.updatePaidStatusMedicalRecordById(this.mrId)
        .then(() => {
          // this.showCancelConfirmationModal = false
          this.showModalStatus = false
          this.updateScheduleData()
          this.fetchToday()
        })
        .catch((error) => {
          console.error('Error deleting medical record:', error)
        })

      await Promise.all([this.fetchToday(), this.fetchPhysio(), this.fetchPatients()])
      this.updateScheduleData()
    },
    async confirmDelete() {
      await this.deleteMedicalRecord(this.mrId)
        .then(() => {
          this.showCancelConfirmationModal = false
          this.updateScheduleData()
          this.fetchToday()
        })
        .catch((error) => {
          console.error('Error deleting medical record:', error)
        })

      await Promise.all([this.fetchToday(), this.fetchPhysio(), this.fetchPatients()])
      this.updateScheduleData()
    },

    updateScheduleData() {
      this.schedule.forEach((slot) => {
        const todaySlots = this.today.filter((todayItem) => todayItem.timeSlot === slot.time)

        slot.data = []

        todaySlots.forEach((todaySlot) => {
          slot.data.push({
            fisio: todaySlot.Physio.name,
            PhysioId: todaySlot.Physio.id,
            name: `${todaySlot.Patient.name}`,
            status: todaySlot.evaluation ? true : false,
            MedicalRecordId: todaySlot.id,
            arrivalDate: todaySlot.arrivalDate,
            timeSlot: todaySlot.timeSlot,
            complaint: todaySlot.complaint,
            diagnosis: todaySlot.diagnosis,
            evaluation: todaySlot.evaluation,
            intervention: todaySlot.intervention,
            paidStatus: todaySlot.paidStatus
          })
        })
      })
    },
    getPatientsByFisio(hourData, fisio) {
      return hourData.data.filter((patient) => patient.PhysioId === fisio)
    },
    hasTrueStatus(hourData, fisio) {
      // console.log(hourData, fisio, '?????????????????')
      return hourData.data.some(
        (patient) => patient.PhysioId === fisio && patient.paidStatus === true
      )
    },
    hasFalseStatus(hourData, fisio) {
      return hourData.data.some(
        (patient) => patient.PhysioId === fisio && patient.paidStatus === false
      )
    },
    isColumnEmpty(hourData, fisio) {
      return hourData.data.every((patient) => patient.PhysioId !== fisio)
    },
    handleCellButtonClick(hourData, fisio, selectedTime) {
      const patients = this.getPatientsByFisio(hourData, fisio.id)
      const isColumnEmpty = this.isColumnEmpty(hourData, fisio.id)

      if (isColumnEmpty) {
        // console.log(this.selectedDate, "<<<<<<>>>>>");

        this.showModal = true
        this.formData.timeSlot = selectedTime
        this.formData.PhysioId = fisio.id
        this.formData.arrivalDate = this.selectedDate
          ? new Date(this.selectedDate.toISOString().split('T')[0])
          : ''
        this.newFormData.timeSlot = selectedTime
        this.newFormData.PhysioId = fisio.id
        this.newFormData.arrivalDate = this.selectedDate
        this.clickedHour = hourData.time
        console.log('Show pop-up to add new patient', this.clickedHour)

        this.defaultTimeSlot = selectedTime
      } else {
        const hasTrueStatus = this.hasTrueStatus(hourData, fisio.id)
        if (hasTrueStatus) {
          console.log('Show pop-up for detail/edit/delete')
          this.clickedHour = hourData.time
          this.showModalSuccess = true
          this.formData.timeSlot = selectedTime
          this.formData.PhysioId = fisio.id

          this.defaultTimeSlot = selectedTime
        } else {
          console.log('Show pop-up for edit/delete')
          this.clickedHour = hourData.time
          this.showModalStatus = true
          let data = this.getPatientsByFisio(hourData, fisio.id)
          this.mrId = data[0].MedicalRecordId
          this.formData = {
            PhysioId: data[0].PhysioId,
            complaint: data[0].complaint,
            arrivalDate: data[0].arrivalDate,
            diagnosis: data[0].diagnosis,
            intervention: data[0].intervention,
            timeSlot: data[0].timeSlot,
            evaluation: data[0].evaluation,
            paidStatus: data[0].paidStatus
          }
          this.modalStatusText = data[0].name
          this.formData.timeSlot = selectedTime
          this.formData.PhysioId = fisio.id

          this.defaultTimeSlot = selectedTime
        }
      }
    },
    handleDateChange() {
      this.fetchToday(this.selectedDate)
        .then(() => {
          console.log('Tanggal yang dipilih:', this.selectedDate)
        })
        .catch((error) => {
          Swal.fire(error.response.data.message)
        })
    },
    handleUpdateScheduleClick() {
      this.fetchToday(this.selectedDate)
        .then(() => {
          console.log('Tanggal yang dipilih:', this.selectedDate)
          this.updateScheduleData()
        })
        .catch((error) => {
          Swal.fire(error.response.data.message)
        })
    },
    handleTambahFisioClick() {
      this.$router.push('/add-fisio')
    },
    async handleFormSubmit() {
      if (this.patientType === 'new') {
        this.newFormData.arrivalDate = this.selectedDate
          ? this.selectedDate
          : this.newFormData.arrivalDate
        await this.addPatientMedicalRecord(this.newFormData)
          .then(() => {
            this.showModal = false
            this.updateScheduleData()
            this.fetchToday()
          })
          .then(() => {
            this.newFormData = {
              medicalRecordNumber: '',
              name: '',
              gender: '',
              address: '',
              email: '',
              phoneNumber: '',
              city: '',
              placeOfBirth: '',
              dateOfBirth: '',
              occupation: '',
              PhysioId: '',
              complaint: '',
              arrivalDate: '',
              diagnosis: '',
              intervention: '',
              timeSlot: '',
              evaluation: '',
              paidStatus: ''
            }
          })
          .catch((error) => {
            console.error('Error adding new patient:', error)
          })
      } else {
        this.formData.PatientId = +this.formData.PatientId
        this.formData.arrivalDate = this.selectedDate
          ? this.selectedDate
          : this.formData.arrivalDate
        // console.log(this.formData.arrivalDate, "KKKKKKKKKKKK");
        await this.addMedicalRecordMR(this.formData)
          .then(() => {
            this.showModal = false
            this.updateScheduleData()
            this.fetchToday()
          })
          .then(() => {
            this.formData = {
              PatientId: '',
              PhysioId: '',
              complaint: '',
              arrivalDate: '',
              diagnosis: '',
              intervention: '',
              timeSlot: '',
              evaluation: '',
              paidStatus: ''
            }
          })
          .catch((error) => {
            console.error('Error adding new patient:', error)
          })
      }

      await Promise.all([this.fetchToday(), this.fetchPhysio(), this.fetchPatients()])
      this.updateScheduleData()
    }
  },
  async created() {
    const res = await Promise.all([this.fetchToday(), this.fetchPhysio(), this.fetchPatients()])
    this.updateScheduleData()
    this.formData.timeSlot = this.defaultTimeSlot
    this.schedule.forEach((hourData) => {
      hourData.data = [...hourData.data]

      this.fisio.forEach((fisio) => {
        hourData.data.push({ fisio, name: '' })
      })
    })
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center mb-5 align-right">Jadwal Praktek Fisio</h1>
    <div class="row">
      <div class="col-md-6">
        <button class="btn btn-primary" @click="handleTambahFisioClick">Tambah Fisio</button>
      </div>
      <div class="col-md-6">
        <div class="filter-section mb-2">
          <label for="filterDate" class="mr-2">Filter Tanggal:</label>
          <input
            type="date"
            id="filterDate"
            v-model="selectedDate"
            class="form-control mx-2"
            style="width: 200px; padding: 8px"
          />
          <button class="btn btn-primary ml-2" @click="handleUpdateScheduleClick">
            Update Jadwal
          </button>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th class="bg-info" style="width: 80px">Jam</th>
            <th v-for="fisio in fisio" :key="fisio.id">
              <button style="width: 120px" @click="handleFisioNameClick(fisio)">
                {{ fisio.name }}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hourData in schedule" :key="hourData.time">
            <td>{{ hourData.hour }}</td>
            <template v-for="fisio in fisio">
              <td style="width: 70px">
                <button
                  style="height: 50px"
                  :class="{
                    'btn-secondary': hasTrueStatus(hourData, fisio.id),
                    'btn-warning': hasFalseStatus(hourData, fisio.id),
                    'btn-success': isColumnEmpty(hourData, fisio.id)
                  }"
                  type="button"
                  class="btn cell-button"
                  @click="handleCellButtonClick(hourData, fisio, hourData.time)"
                >
                  <!-- Display the patient names -->
                  <p
                    v-for="patient in getPatientsByFisio(hourData, fisio.id)"
                    :key="patient.PhysioId"
                  >
                    {{ patient.name || '-' }}
                  </p>
                </button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <!-- Form -->
        <form @submit.prevent="handleFormSubmit">
          <div class="form-group d-flex justify-content-center gap-4 align-items-center">
            <div class="form-check mr-3">
              <input
                class="form-check-input"
                type="radio"
                id="newPatient"
                value="new"
                v-model="patientType"
              />
              <label class="form-check-label" for="newPatient">Pasien Baru</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="existingPatient"
                value="existing"
                v-model="patientType"
              />
              <label class="form-check-label" for="existingPatient">Pasien Terdaftar</label>
            </div>
          </div>

          <div style="margin-top: 10px" v-if="patientType === 'new'" class="form-group">
            <label for="medicalRecordNumber" class="form-label">Nomor Rekam Medis Baru:</label>
            <input
              v-model="newFormData.medicalRecordNumber"
              type="text"
              class="form-control"
              id="medicalRecordNumber"
              placeholder="masukkan nomor rekam medis baru"
            />
            <label for="name" class="form-label">Nama:</label>
            <input
              v-model="newFormData.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="name"
            />
            <label for="gender" class="form-label">Jenis Kelamin:</label>
            <select v-model="newFormData.gender" class="form-select" id="gender">
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
            <label for="address" class="form-label">Alamat:</label>
            <textarea
              v-model="newFormData.address"
              class="form-control"
              id="address"
              rows="3"
            ></textarea>
            <label for="email" class="form-label">Email:</label>
            <input v-model="newFormData.email" type="email" class="form-control" id="email" />
            <label for="phoneNumber" class="form-label">Nomor HP:</label>
            <input
              v-model="newFormData.phoneNumber"
              type="tel"
              class="form-control"
              id="phoneNumber"
            />
            <label for="city" class="form-label">Kota:</label>
            <input v-model="newFormData.city" type="text" class="form-control" id="city" />
            <label for="placeOfBirth" class="form-label">Tempat Lahir:</label>
            <input
              v-model="newFormData.placeOfBirth"
              type="text"
              class="form-control"
              id="placeOfBirth"
            />
            <label for="dateOfBirth" class="form-label">Tanggal Lahir:</label>
            <input
              v-model="newFormData.dateOfBirth"
              type="date"
              class="form-control"
              id="dateOfBirth"
            />
            <label for="occupation" class="form-label">Pekerjaan:</label>
            <input v-model="newFormData.occupation" class="form-control" id="occupation" rows="3" />
            <!-- <label for="physioId" class="form-label">ID Fisioterapis:</label>
            <select v-model="newFormData.PhysioId" class="form-control" id="physioId">
              <option v-for="physio in fisio" :key="physio.id" :value="physio.id">
                {{ physio.id }} - {{ physio.name }}
              </option>
            </select> -->
            <label for="complaint" class="form-label">Keluhan:</label>
            <textarea
              v-model="newFormData.complaint"
              class="form-control"
              id="complaint"
              rows="3"
            ></textarea>
            <label for="arrivalDate" class="form-label"
              >Tanggal Kedatangan: {{ new Date(newFormData.arrivalDate) }}</label
            >
            <input
              v-model="newFormData.arrivalDate"
              type="date"
              class="form-control"
              id="arrivalDate"
            />
            <label for="timeSlot">Jam:</label>
            <select v-model="newFormData.timeSlot" class="form-control" id="timeSlot">
              <option
                v-for="hour in Array.from({ length: 13 }, (_, index) => index + 8)"
                :key="hour"
                :value="hour"
                :selected="hour === clickedHour"
              >
                {{ hour }}
              </option>
            </select>

            <!-- <label for="paidStatus" class="form-label">Status Pembayaran:</label>
            <input
              v-model="newFormData.paidStatus"
              type="text"
              class="form-control"
              id="paidStatus"
            /> -->
          </div>

          <div style="margin-top: 10px" v-if="patientType === 'existing'" class="form-group">
            <label for="PatientId">Masukkan NomorMR Pasien Terdaftar:</label>
            <input
              v-model="formData.medicalRecordNumber"
              list="patientsList"
              class="form-control"
              id="PatientId"
            />
            <datalist id="patientsList">
              <option v-for="patient in patients" :key="patient.id" :value="patient.medicalRecordNumber">
                {{ patient.medicalRecordNumber }} - {{ patient.name }}
              </option>
            </datalist>
            <label for="complaint">Complaint:</label>
            <input
              v-model="formData.complaint"
              type="text"
              class="form-control"
              id="complaint"
              placeholder="Masukkan Complaint"
            />

            <!-- Tambahkan input field untuk paidStatus -->
            <!-- <label for="paidStatus">Paid Status:</label>
            <select v-model="formData.paidStatus" class="form-control" id="paidStatus">
              <option value="true">True</option>
              <option value="false">False</option>
            </select> -->

            <!-- Tambahkan input field untuk arrivalDate -->
            <label for="arrivalDate">Arrival Date:</label>
            <input
              v-model="formData.arrivalDate"
              type="date"
              class="form-control"
              id="arrivalDate"
              placeholder="Masukkan Arrival Date"
            />

            <label for="timeSlot">Jam:</label>
            <select v-model="formData.timeSlot" class="form-control" id="timeSlot">
              <option
                v-for="hour in Array.from({ length: 13 }, (_, index) => index + 8)"
                :key="hour"
                :value="hour"
                :selected="hour === clickedHour"
              >
                {{ hour }}
              </option>
            </select>
          </div>

          <!-- ... tambahkan field formulir lainnya ... -->

          <div class="form-group" style="margin-top: 20px">
            <button type="submit" class="btn btn-primary">Tambah Medical Record Pasien</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showModalStatus" class="modal-a">
      <div class="modal-a-content">
        <!-- Tombol close dengan gambar 'x' di pojok kiri atas -->
        <span class="close-a" @click="showModalStatus = false">&times;</span>

        <!-- Teks yang akan ditampilkan -->
        <br />
        <h3>{{ modalStatusText }}</h3>

        <!-- Tombol Edit dan Delete di bagian bawah modal -->
        <div class="button-a-container">
          <button class="delete-a-button" @click="handleDeleteClick">Cancel</button>
          <button class="edit-a-button" @click="handleEditClick(selectedPatient)">
            Reschedule
          </button>
          <button class="process-a-button" @click="handleUpdatePaidStatus">Proses</button>
        </div>
      </div>
    </div>

    <!-- Modal for Edit Form -->
    <div v-if="showModalEdit" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModalEdit = false">&times;</span>
        <!-- Form -->
        <form @submit.prevent="handleFormEditSubmit">
          <!-- ... existing form fields ... -->

          <!-- Additional fields for the edit form -->

          <label for="complaint">Complaint:</label>
          <input v-model="formData.complaint" type="text" class="form-control" id="complaint" />

          <label for="diagnosis">Diagnosis:</label>
          <input v-model="formData.diagnosis" type="text" class="form-control" id="diagnosis" />

          <label for="intervention">Intervention:</label>
          <input
            v-model="formData.intervention"
            type="text"
            class="form-control"
            id="intervention"
          />

          <label for="evaluation">Evaluation:</label>
          <textarea
            v-model="formData.evaluation"
            class="form-control"
            id="evaluation"
            rows="3"
          ></textarea>

          <!-- <label for="paidStatus">Paid Status:</label>
          <select v-model="formData.paidStatus" class="form-control" id="paidStatus">
            <option value="true">True</option>
            <option value="false">False</option>
          </select> -->

          <label for="arrivalDate">Arrival Date:</label>
          <input v-model="formData.arrivalDate" type="date" class="form-control" id="arrivalDate" />

          <label for="timeSlot">Jam:</label>
          <select v-model="formData.timeSlot" class="form-control" id="timeSlot">
            <option
              v-for="hour in Array.from({ length: 13 }, (_, index) => index + 8)"
              :key="hour"
              :value="hour"
              :selected="hour === clickedHour"
            >
              {{ hour }}
            </option>
          </select>
          <!-- ... other form fields ... -->

          <div class="form-group" style="margin-top: 20px">
            <button type="submit" class="btn btn-primary">Update Medical Record</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showCancelConfirmationModal" class="modal-overlay">
      <div class="modal-content-a">
        <!-- Close button in the top-right corner -->
        <span class="close-button" @click="showCancelConfirmationModal = false">&times;</span>

        <!-- Confirmation message -->
        <p class="confirmation-message">Apakah kamu yakin ingin menghapus jadwal ini?</p>

        <!-- Buttons for confirmation -->
        <div class="button-container">
          <button @click="toggleCancelConfirmationModal" class="cancel-button">No, Cancel</button>
          <button @click="confirmDelete" class="delete-button">Yes, Delete</button>
        </div>
      </div>
    </div>

    <div v-if="selectedFisio" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeFisioModal">&times;</span>

        <!-- Show fisio details here -->
        <div class="fisio-details text-center">
          <h3>{{ selectedFisio.name }}</h3>
        </div>

        <!-- Buttons for fisio actions -->
        <div class="button-container">
          <button class="edit-button" @click="editFisioForm">Edit Fisio</button>
          <button class="delete-button" @click="confirmDeleteFisio">Delete Fisio</button>
        </div>
      </div>
    </div>

    <div v-if="showEditForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showEditForm = false">&times;</span>
        <!-- Form -->
        <form @submit.prevent="saveFisioChanges" class="edit-form">
          <div class="mb-3">
            <label for="name" class="form-label">Nama:</label>
            <input v-model="formFisio.name" type="text" class="form-control" id="name" required />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Alamat:</label>
            <textarea
              v-model="formFisio.address"
              class="form-control"
              id="address"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="phoneNumber" class="form-label">Nomor HP:</label>
            <input
              v-model="formFisio.phoneNumber"
              type="tel"
              class="form-control"
              id="phoneNumber"
              required
            />
          </div>

          <!-- Save button -->
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>

    <div v-if="showCancelConfirmationModalFisio" class="modal-overlay">
      <div class="modal-content-a">
        <!-- Close button in the top-right corner -->
        <span class="close-button" @click="showCancelConfirmationModalFisio = false">&times;</span>

        <!-- Confirmation message -->
        <p class="confirmation-message">Apakah kamu yakin ingin menghapus fisio ini?</p>

        <!-- Buttons for confirmation -->
        <div class="button-container">
          <button @click="toggleCancelConfirmationModalFisio" class="cancel-button">
            No, Cancel
          </button>
          <button @click="deleteFisiotherapy" class="delete-button">Yes, Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-oren {
  background-color: orange;
  color: white;
}
.edit-form-modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.edit-form-modal .modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.edit-form-modal .close {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.edit-form {
  margin-bottom: 20px;
}

.edit-form button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
}

.button-container {
  display: flex;
  justify-content: space-around;
}
.delete-button {
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #f44336; /* Red color */
  color: #fff;
}
.cancel-button {
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #ff9800; /* Orange color */
  color: #fff;
}
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.confirmation-message {
  font-size: 18px;
  margin-bottom: 20px;
}
.modal-a {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-a-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  text-align: center;
  position: relative;
}

.close-a {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

.button-a-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.edit-a-button,
.process-a-button,
.delete-a-button {
  padding: 8px 15px;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}

.edit-a-button {
  background-color: #ff9800; /* warna oranye */
  color: #fff;
}

.process-a-button {
  background-color: #06bb12; /* warna oranye */
  color: #fff;
}

.delete-a-button {
  background-color: #f44336; /* warna merah */
  color: #fff;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.modal-content-a {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  text-align: center;
  position: relative;
  max-width: 400px; /* Set maximum width of the modal content */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}

.btn-success {
  background-color: #4caf50; /* Warna hijau untuk status true */
}

.btn-warning {
  background-color: #ff9800; /* Warna oren untuk status false */
}

.btn-secondary {
  background-color: #0998ea; /* Warna abu-abu untuk kolom kosong */
}

.cell-button {
  width: 100%; /* Tombol mengisi seluruh lebar kolom */
}

.filter-section {
  display: flex;
  align-items: center;
}

.btn-warning-false {
  background-color: #807f7f; /* Warna oranye untuk status false */
  color: #980e0e;
}
</style>
