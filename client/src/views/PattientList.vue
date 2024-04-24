<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-between row">
      <div class="col-md-8">
        <h1>Daftar Pasien</h1>
      </div>
      <div class="col-md-4">
        <button class="btn btn-primary" @click="handleTambahPasienClick">Tambah Pasien</button>
      </div>
    </div>

    <!-- Tambahkan input untuk pencarian -->
    <div class="input-group mb-3">
      <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari pasien...">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="resetSearch">Reset</button>
      </div>
    </div>

    <!-- Tampilkan daftar pasien yang telah difilter dan terbagi per halaman -->
    <table class="table text-center table-bordered">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama Pasien</th>
          <th scope="col">Nomor Rekam Medis</th>
          <th scope="col">Email</th>
          <th scope="col">Nomor Hp</th>
          <th scope="col">Detail Pasien</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, index) in paginatedPatients" :key="patient.id">
          <th scope="row">{{ (currentPage - 1) * pageSize + index + 1 }}</th>
          <td>{{ patient.name }}</td>
          <td>{{ patient.medicalRecordNumber }}</td>
          <td>{{ patient.email }}</td>
          <td>{{ patient.phoneNumber }}</td>
          <td>
            <button class="btn btn-info" @click="handleDetailPasienClick(patient)">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tampilkan navigasi paginasi -->
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        </li>
        <li class="page-item" v-for="page in totalPage" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPage }">
          <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'PatientList',

  computed: {
    ...mapState(useCounterStore, ['patients']),
    filteredPatients() {
      // Tambahkan penanganan jika this.patients adalah undefined
      if (!this.patients) {
        return [];
      }

      const query = this.searchQuery.toLowerCase();
      return this.patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.medicalRecordNumber.toLowerCase().includes(query) ||
          patient.email.toLowerCase().includes(query) ||
          patient.phoneNumber.toLowerCase().includes(query)
      );
    },
    totalPage() {
      return Math.ceil(this.filteredPatients.length / this.pageSize);
    },
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredPatients.slice(start, end);
    },
  },

  methods: {
    ...mapActions(useCounterStore, ['fetchPatients', 'handleTambahPasienClick']),

    handleTambahPasienClick() {
      this.$router.push('/add-patient');
    },

    handleDetailPasienClick(patient) {
      this.$router.push(`/detail-patient/${patient.id}`)
    },

    // Fungsi ini akan dipanggil ketika tombol Reset di klik
    resetSearch() {
      this.searchQuery = '';
    },

    // Fungsi ini akan dipanggil ketika tombol halaman paginasi di klik
    goToPage(page) {
      this.currentPage = page;
    },
  },

  created() {
    this.fetchPatients();
  },

  data() {
    return {
      searchQuery: '', // Tambahkan variabel untuk menyimpan query pencarian
      pageSize: 10,
      currentPage: 1,
    };
  },

};
</script>
