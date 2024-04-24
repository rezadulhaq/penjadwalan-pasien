<template>
  <div class="container mt-5">
    <h1>Tambah Medical Record</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="patientId" class="form-label">ID Pasien:</label>
        <select v-model="formData.PatientId" class="form-control" id="patientId" required>
          <option value="input">Input Manual</option>
          <option v-for="patient in patients" :key="patient.id" :value="patient.id"> {{ patient.id }} - {{ patient.medicalRecordNumber }} - {{ patient.name }}</option>
        </select>
        <!-- Input teks yang muncul ketika memilih "Input Manual" -->
        <input v-if="formData.PatientId === 'input'" v-model="formData.manualPatientId" type="text" class="form-control" placeholder="Masukkan ID Pasien" required />
      </div>
      <div class="mb-3">
        <label for="physioId" class="form-label">ID Fisioterapis:</label>
        <select v-model="formData.PhysioId" class="form-control" id="physioId" required>
          <option value="input">Input Manual</option>
          <option v-for="physio in fisio" :key="physio.id" :value="physio.id"> {{ physio.id }} - {{ physio.name }}</option>
        </select>
        <!-- Input teks yang muncul ketika memilih "Input Manual" -->
        <input v-if="formData.PhysioId === 'input'" v-model="formData.manualPhysioId" type="text" class="form-control" placeholder="Masukkan ID Fisioterapis" required />
      </div>
      <div class="mb-3">
        <label for="complaint" class="form-label">Keluhan:</label>
        <textarea
          v-model="formData.complaint"
          class="form-control"
          id="complaint"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="arrivalDate" class="form-label">Tanggal Kedatangan:</label>
        <input
          v-model="formData.arrivalDate"
          type="date"
          class="form-control"
          id="arrivalDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="diagnosis" class="form-label">Diagnosis:</label>
        <input
          v-model="formData.diagnosis"
          type="text"
          class="form-control"
          id="diagnosis"
          required
        />
      </div>
      <div class="mb-3">
        <label for="intervention" class="form-label">Intervensi:</label>
        <input
          v-model="formData.intervention"
          type="text"
          class="form-control"
          id="intervention"
          required
        />
      </div>
      <div class="mb-3">
        <label for="timeSlot" class="form-label">Waktu Slot:</label>
        <input
          v-model="formData.timeSlot"
          type="text"
          class="form-control"
          id="timeSlot"
          required
        />
      </div>
      <div class="mb-3">
        <label for="evaluation" class="form-label">Evaluasi:</label>
        <textarea
          v-model="formData.evaluation"
          class="form-control"
          id="evaluation"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="paidStatus" class="form-label">Status Pembayaran:</label>
        <input
          v-model="formData.paidStatus"
          type="text"
          class="form-control"
          id="paidStatus"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Tambah Medical Record Pasien</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'AddMedicalRecord',
  data() {
    return {
      formData: {
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
    }
  }
  ,
  computed: {
    ...mapState(useCounterStore, ['patients', 'fisio'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchPatients', 'fetchPhysio', 'addMedicalRecord']),
    handleSubmit() {
      // Lakukan validasi formulir jika diperlukan sebelum menambahkan pasien
      this.addMedicalRecord(this.formData)
      // Redirect ke halaman daftar pasien setelah berhasil menambahkan
      this.$router.push({ name: 'PatientList' })
    }
  },
  created() {
    this.fetchPatients()
    this.fetchPhysio()
  }
}
</script>
