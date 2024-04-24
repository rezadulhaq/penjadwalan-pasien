<template>
    <div class="container mt-5">
      <h1>Tambah Fisio</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Nama:</label>
          <input v-model="formData.name" type="text" class="form-control" id="name" required>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Alamat:</label>
          <textarea v-model="formData.address" class="form-control" id="address" rows="3" required></textarea>
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Nomor HP:</label>
          <input v-model="formData.phoneNumber" type="tel" class="form-control" id="phoneNumber" required>
        </div>
        <button type="submit" class="btn btn-primary">Tambah Fisio</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'pinia';
  import { useCounterStore } from '../stores/counter';
  
  export default {
    name: 'AddFisio',
    data() {
      return {
        formData: {
          name: '',
          address: '',
          phoneNumber: '',
        },
      };
    },
    methods: {
      ...mapActions(useCounterStore, ['addFisio']),
      handleSubmit() {
        // Lakukan validasi formulir jika diperlukan sebelum menambahkan pasien
        this.addFisio(this.formData);
        // Redirect ke halaman daftar pasien setelah berhasil menambahkan
        this.$router.push({ name: 'schedule' });
      },
    },
  };
  </script>
  