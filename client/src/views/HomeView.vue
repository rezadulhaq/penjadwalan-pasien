<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Pasien Yang Datang Sampai Saat Ini</h5>
              <p class="card-text">{{ patients.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h2 v-if="patients.length">Daftar Customer</h2>
        <table v-if="patients.length" class="table text-center table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Nomor Hp</th>
              <th scope="col">Alamat</th>
              <th scope="col">Tanggal Pendaftaran</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(patient, index) in paginatedPatients" :key="index">
              <th scope="row">{{ (currentPage - 1) * perPage + index + 1 }}</th>
              <td>{{ patient.name }}</td>
              <td>{{ patient.phoneNumber }}</td>
              <td>{{ patient.address }}</td>
              <td>{{ formatDateIndonesian(patient.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-center" v-else>Belum ada pasien</h2>
        
        <!-- Pagination Controls -->
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" @click="currentPage > 1 && (currentPage -= 1)">Previous</a>
            </li>
            <li class="page-item" v-for="page in Math.ceil(patients.length / perPage)" :key="page" :class="{ active: currentPage === page }">
              <a class="page-link" @click="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === Math.ceil(patients.length / perPage) }">
              <a class="page-link" @click="currentPage < Math.ceil(patients.length / perPage) && (currentPage += 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "HomeView",
  data() {
    return {
      currentPage: 1,
      perPage: 10, // Set the number of items per page
    };
  },
  computed: {
    ...mapState(useCounterStore, ["patients"]),
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.patients.slice(start, end);
    },
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchPatients"]),
    formatDateIndonesian(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
  },
  created() {
    this.fetchPatients();
  },
};
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
