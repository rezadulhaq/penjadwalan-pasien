<template>
    <div class="container mt-5">
      <div class="row">
        <h1 class="text-center mb-5">Edit Data Pasien</h1>
        <div class="col-md-6">
          <!-- Form untuk mengedit data pasien -->
          <form @submit.prevent="updatePatient">
            <div class="mb-3">
              <label for="name" class="form-label">Nama Pasien</label>
              <input type="text" v-model="editedPatient.name" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
              <label for="medicalRecordNumber" class="form-label">Nomor Rekam Medis</label>
              <input type="text" v-model="editedPatient.medicalRecordNumber" class="form-control" id="medicalRecordNumber" required>
            </div>
            <div class="mb-3">
              <label for="gender" class="form-label">Jenis Kelamin</label>
              <select v-model="editedPatient.gender" class="form-select" id="gender" required>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <!-- Tambahkan input form lainnya sesuai kebutuhan -->
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'pinia'
  import { useCounterStore } from '../stores/counter'
  
  export default {
    name: 'EditPatient',
    data() {
      return {
        editedPatient: {
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
          // Tambahkan properti lainnya sesuai kebutuhan
        }
      };
    },
    created() {
      // Panggil method atau fungsi untuk mendapatkan data pasien dari server
      this.fetchDetailPatient(this.$route.params.id);
    },
    computed: {
      ...mapState(useCounterStore, ['patient'])
    },
    methods: {
      ...mapActions(useCounterStore, ['fetchDetailPatient', 'updatePatient']),
      formatBirthDate(dateString) {
        // Implementasikan sesuai kebutuhan format tanggal lahir
        return new Date(dateString).toLocaleDateString();
      },
      formatDate(dateTimeString) {
        // Implementasikan sesuai kebutuhan format tanggal dan waktu
        return new Date(dateTimeString).toLocaleString();
      },
      updatePatient() {
        // Panggil method atau fungsi untuk mengirim perubahan data pasien ke server
        this.updatePatientData({
          id: this.$route.params.id,
          data: this.editedPatient
        });
      }
    }
  };
  </script>
  