<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-between row">
      <div class="col-md-8">
        <h1>Daftar Rekam Medis</h1>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <label for="searchMedicalRecordNumber">Cari Nomor Rekam Medis:</label>
        <input type="text" v-model="searchMedicalRecordNumber" id="searchMedicalRecordNumber" class="form-control" />
      </div>
    </div>
    <div class="col-md-4">
      <button class="btn btn-primary mt-3" @click="$router.push(`/add-medical-record`)">Tambah Rekam Medis</button>
    </div>
    <!-- dinamis -->
    <table class="table text-center table-bordered mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nomor Rekam Medis</th>
          <th scope="col">Nama Pasien</th>
          <th scope="col">Email</th>
          <th scope="col">Nomor Hp</th>
          <th scope="col">Detail Pasien</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, index) in paginatedPatients" :key="patient.id">
          <th scope="row">{{ (currentPage - 1) * pageSize + index + 1 }}</th>
          <td>{{ patient.Patient.medicalRecordNumber }}</td>
          <td>{{ patient.Patient.name }}</td>
          <td>{{ patient.Patient.email }}</td>
          <td>{{ patient.Patient.phoneNumber }}</td>
          <td>
            <button class="btn btn-info" @click="$router.push(`/medical-record/${patient.id}`)">Detail</button>
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
  name: 'MedicalRecordList',
  data() {
    return {
      searchMedicalRecordNumber: '',
      pageSize: 20,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(useCounterStore, ['mrecord']),
    totalPage() {
      return Math.ceil(this.filteredPatients.length / this.pageSize);
    },
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredPatients.slice(start, end);
    },
    filteredPatients() {
      // Menggunakan pencarian berdasarkan nomor rekam medis
      return this.mrecord.filter(patient =>
        patient.Patient.medicalRecordNumber.includes(this.searchMedicalRecordNumber)
      );
    },
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchAllMedicalRecord']),

    handleTambahPasienClick() {
      console.log('Tambah Pasien diklik');
    },

    handleDetailPasienClick(patient) {
      console.log('Detail Pasien diklik', patient);
    },

    // Fungsi ini akan dipanggil ketika tombol halaman paginasi di klik
    goToPage(page) {
      this.currentPage = page;
    },
  },

  created() {
    this.fetchAllMedicalRecord();
  },
};
</script>
