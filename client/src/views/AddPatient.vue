<template>
    <div class="container mt-5">
      <h1>Tambah Pasien</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="medicalRecordNumber" class="form-label">Nomor Rekam Medis:</label>
          <input v-model="formData.medicalRecordNumber" type="text" class="form-control" id="medicalRecordNumber" required>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Nama:</label>
          <input v-model="formData.name" type="text" class="form-control" id="name" required>
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Jenis Kelamin:</label>
          <select v-model="formData.gender" class="form-select" id="gender" required>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Alamat:</label>
          <textarea v-model="formData.address" class="form-control" id="address" rows="3" required></textarea>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input v-model="formData.email" type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Nomor HP:</label>
          <input v-model="formData.phoneNumber" type="tel" class="form-control" id="phoneNumber" required>
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">Kota:</label>
          <input v-model="formData.city" type="text" class="form-control" id="city" required>
        </div>
        <div class="mb-3">
          <label for="placeOfBirth" class="form-label">Tempat Lahir:</label>
          <input v-model="formData.placeOfBirth" type="text" class="form-control" id="placeOfBirth" required>
        </div>
        <div class="mb-3">
          <label for="dateOfBirth" class="form-label">Tanggal Lahir:</label>
          <input v-model="formData.dateOfBirth" type="date" class="form-control" id="dateOfBirth" required>
        </div>
        <div class="mb-3">
          <label for="occupation" class="form-label">Pekerjaan:</label>
          <textarea v-model="formData.occupation" class="form-control" id="occupation" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Tambah Pasien</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'pinia';
  import { useCounterStore } from '../stores/counter';
  
  export default {
    name: 'AddPatient',
    data() {
      return {
        formData: {
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
        },
      };
    },
    methods: {
      ...mapActions(useCounterStore, ['addPatient']),
      handleSubmit() {
        // Lakukan validasi formulir jika diperlukan sebelum menambahkan pasien
        this.addPatient(this.formData);
        // Redirect ke halaman daftar pasien setelah berhasil menambahkan
        this.$router.push({ name: 'PatientList' });
      },
    },
  };
  </script>
  