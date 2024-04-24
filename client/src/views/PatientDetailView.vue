<template>
  <div class="container mt-5">
    <div class="row">
      <h1 class="text-center mb-5">Nama Pasien: {{ patient.name }}</h1>
      <!-- Bagian kiri -->
      <div class="col-md-6">
        <div>
          <!-- Data pasien - Bagian kiri -->
          <table>
            <tr>
              <td style="width: 200px"><strong>Nomor Rekam Medis</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ patient.medicalRecordNumber }}</td>
            </tr>
            <tr>
              <td style="width: 200px"><strong>Jenis Kelamin</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ patient.gender }}</td>
            </tr>
            <tr>
              <td style="width: 200px"><strong>Alamat</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ patient.address }}</td>
            </tr>
            <tr>
              <td style="width: 200px"><strong>Email</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ patient.email }}</td>
            </tr>
            <tr>
              <td style="width: 200px"><strong>Nomor HP</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ patient.phoneNumber }}</td>
            </tr>
            <tr>
              <td style="width: 200px"><strong>Kota</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ patient.city }}</td>
            </tr>
            <tr>
              <td style="width: 200px"><strong>Tempat Lahir</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ patient.placeOfBirth }}</td>
            </tr>
            <tr>
              <td style="width: 200px"><strong>Tanggal Lahir</strong></td>
              <td style="width: 20px">:</td>
              <td>{{ formatBirthDate(patient.dateOfBirth) }}</td>
            </tr>
          </table>

          <!-- Tombol untuk mengedit data pasien -->
          <!-- <router-link :to="{ name: 'EditPatient', params: { id: patient.id } }"> -->
          <button class="btn btn-primary" @click="$router.push(`/patient/edit/${patient.id}`)" style="margin-top: 10px">Edit Data Pasien</button>
          <!-- </router-link> -->
        </div>
      </div>

      <!-- Bagian kanan -->
      <div class="col-md-6">
        <!-- Data pasien - Bagian kanan -->
        <table>
          <tr>
            <td style="width: 200px"><strong>Pekerjaan</strong></td>
            <td style="width: 20px">:</td>
            <td>{{ patient.occupation }}</td>
          </tr>
          <tr>
            <td><strong>Tiket</strong></td>
            <td>:</td>
            <td>{{ patient.ticket }}</td>
          </tr>
          <tr>
            <td><strong>Tanggal Dibuat</strong></td>
            <td>:</td>
            <td>{{ formatDate(patient.createdAt) }}</td>
          </tr>
          <tr>
            <td><strong>Tanggal Diperbarui</strong></td>
            <td>:</td>
            <td>{{ formatDate(patient.updatedAt) }}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Data rekam medis dalam bentuk tabel -->
    <div class="mt-4">
      <h2>Data Rekam Medis</h2>
      <!-- <button class="btn btn-success mb-3" @click="addMedicalRecord">Tambah Rekam Medis</button> -->
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Fisioterapis</th>
            <th>Keluhan</th>
            <th>Tanggal Kedatangan</th>
            <th>Diagnosis</th>
            <th>Intervensi</th>
            <th>Waktu Slot</th>
            <th>Evaluasi</th>
            <th>Status Pembayaran</th>
            <th>Tanggal Dibuat</th>
            <th>Tanggal Diperbarui</th>
            <th>Aksi</th>
            <!-- Kolom baru untuk tombol aksi -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in patient.MedicalRecords" :key="record.id">
            <td>{{ index + 1 }}</td>
            <td>{{ record.Physio.name }}</td>
            <td>{{ record.complaint }}</td>
            <td>{{ formatDate(record.arrivalDate) }}</td>
            <td>{{ record.diagnosis }}</td>
            <td>{{ record.intervention }}</td>
            <td>{{ record.timeSlot }}</td>
            <td>{{ record.evaluation }}</td>
            <td>{{ record.paidStatus ? 'Lunas' : 'Belum Lunas' }}</td>
            <td>{{ formatDate(record.createdAt) }}</td>
            <td>{{ formatDate(record.updatedAt) }}</td>
            <td>
              <div style="display: flex; gap: 5px">
                <!-- Tombol Detail untuk setiap rekam medis -->
                <!-- <router-link :to="{ name: 'DetailMedicalRecord', params: { id: record.id } }"> -->
                <button class="btn btn-info"  @click="$router.push(`/medical-record/${record.id}`)">Detail</button>
                <!-- </router-link> -->
                <!-- Tombol Delete untuk setiap rekam medis -->
                <button @click="deleteMedicalRecord(record.id)" class="btn btn-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      mrLoaded: false, // Status loading
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { params } = to;
      const mr = await useCounterStore().fetchDetailMedicalRecord(params.id);
      next(vm => {
        // Akses instans komponen menggunakan `vm` dan set data
        vm.mr = mr;
        vm.mrLoaded = true;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Tangani kesalahan, mungkin redirect ke halaman kesalahan
      next('/error');
    }
  },
  computed: {
    ...mapState(useCounterStore, ['mr'])
  },
  methods: {
    ...mapActions(useCounterStore, ['deleteMedicalRecord']),
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

