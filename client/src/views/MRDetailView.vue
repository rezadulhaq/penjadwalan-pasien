<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12" v-if="mrLoaded">
        <!-- Detail Rekam Medis Content -->
        <h1 class="text-center mb-5">Detail Rekam Medis</h1>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">{{ mr.Patient.name }}</h2>
          </div>
          <div class="card-body">
            <!-- Biodata Pasien -->
            <div class="row">
              <div class="col-md-6">
                <ul class="list-group">
                  <li class="list-group-item">
                    <strong>Nomor Rekam Medis:</strong> {{ mr.Patient.medicalRecordNumber }}
                  </li>
                  <li class="list-group-item">
                    <strong>Jenis Kelamin:</strong> {{ mr.Patient.gender }}
                  </li>
                  <li class="list-group-item"><strong>Alamat:</strong> {{ mr.Patient.address }}</li>
                  <li class="list-group-item"><strong>Email:</strong> {{ mr.Patient.email }}</li>
                  <li class="list-group-item">
                    <strong>Nomor HP:</strong> {{ mr.Patient.phoneNumber }}
                  </li>
                  <li class="list-group-item"><strong>Kota:</strong> {{ mr.Patient.city }}</li>
                  <li class="list-group-item">
                    <strong>Tempat Lahir:</strong> {{ mr.Patient.placeOfBirth }}
                  </li>
                  <li class="list-group-item">
                    <strong>Tanggal Lahir:</strong> {{ formatBirthDate(mr.Patient.dateOfBirth) }}
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="list-group">
                  <li class="list-group-item">
                    <strong>Pekerjaan:</strong> {{ mr.Patient.occupation }}
                  </li>
                  <li class="list-group-item"><strong>Tiket:</strong> {{ mr.Patient.ticket }}</li>
                  <li class="list-group-item">
                    <strong>Tanggal Dibuat:</strong> {{ formatDate(mr.Patient.createdAt) }}
                  </li>
                  <li class="list-group-item">
                    <strong>Tanggal Diperbarui:</strong> {{ formatDate(mr.Patient.updatedAt) }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Biodata Fisioterapis -->
            <div class="row mt-4">
              <div class="col-md-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <strong>Fisioterapis:</strong> {{ mr.Physio.name }}
                  </li>
                  <li class="list-group-item">
                    <strong>Alamat Fisioterapis:</strong> {{ mr.Physio.address }}
                  </li>
                  <li class="list-group-item">
                    <strong>Nomor HP Fisioterapis:</strong> {{ mr.Physio.phoneNumber }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Data Rekam Medis -->
            <div class="row mt-4">
              <div class="col-md-12">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Keluhan:</strong> {{ mr.complaint }}</li>
                  <li class="list-group-item">
                    <strong>Tanggal Kedatangan:</strong> {{ formatDate(mr.arrivalDate) }}
                  </li>
                  <li class="list-group-item"><strong>Diagnosis:</strong> {{ mr.diagnosis }}</li>
                  <li class="list-group-item">
                    <strong>Intervensi:</strong> {{ mr.intervention }}
                  </li>
                  <li class="list-group-item"><strong>Waktu Slot:</strong> {{ mr.timeSlot }}</li>
                  <li class="list-group-item"><strong>Evaluasi:</strong> {{ mr.evaluation }}</li>
                  <li class="list-group-item">
                    <strong>Status Pembayaran:</strong>
                    {{ mr.paidStatus ? 'Lunas' : 'Belum Lunas' }}
                  </li>
                  <li class="list-group-item">
                    <strong>Tanggal Dibuat:</strong> {{ formatDate(mr.createdAt) }}
                  </li>
                  <li class="list-group-item">
                    <strong>Tanggal Diperbarui:</strong> {{ formatDate(mr.updatedAt) }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Tombol Detail dan Delete -->
            <div class="row mt-4">
              <div class="col-md-12 text-center">
                <button
                  class="btn btn-info mx-2"
                  @click="$router.push(`/medical-record/edit/${mr.id}`)"
                >
                  Edit
                </button>
                <button @click="deleteMedicalRecord(mr.id)" class="btn btn-danger mx-2">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12" v-else>
        <!-- Loading state -->
        <div class="text-center">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'DetailMR',
  data() {
    return {
      mrLoaded: false, // Loading state
    };
  },
  async created() {
    try {
      // Panggil method atau fungsi untuk mendapatkan data pasien dari server
      await this.fetchDetailMedicalRecord(this.$route.params.id);
      console.log('Data fetched successfully:', this.mr);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Set the loading state to true after a delay
      setTimeout(() => {
        this.mrLoaded = true;
      }, 3000); // 3 seconds delay
    }
  },
  computed: {
    ...mapState(useCounterStore, ['mr'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchDetailMedicalRecord', 'deleteMedicalRecord']),
    formatBirthDate(dateString) {
      // Implementasikan sesuai kebutuhan format tanggal lahir
      return new Date(dateString).toLocaleDateString()
    },
    formatDate(dateTimeString) {
      // Implementasikan sesuai kebutuhan format tanggal dan waktu
      return new Date(dateTimeString).toLocaleString()
    }
  }
}
</script>
