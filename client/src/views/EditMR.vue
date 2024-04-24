<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <!-- Biodata Pasien -->
        <h1 class="text-center mb-5">Edit Rekam Medis</h1>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">{{ mr.Patient.name }}</h2>
          </div>
          <div class="card-body">
            <!-- Data Rekam Medis -->
            <div class="row mt-4">
              <div class="col-md-12">
                <form @submit.prevent="updateMR">
                  <div class="form-group">
                    <label for="complaint">Keluhan:</label>
                    <textarea
                      v-model="formData.complaint"
                      class="form-control"
                      id="complaint"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="arrivalDate">Tanggal Kedatangan:</label>
                    <input
                      v-model="formData.arrivalDate"
                      type="date"
                      class="form-control"
                      id="arrivalDate"
                    />
                  </div>
                  <div class="form-group">
                    <label for="diagnosis">Diagnosis:</label>
                    <input
                      v-model="formData.diagnosis"
                      type="text"
                      class="form-control"
                      id="diagnosis"
                    />
                  </div>
                  <div class="form-group">
                    <label for="intervention">Intervensi:</label>
                    <input
                      v-model="formData.intervention"
                      type="text"
                      class="form-control"
                      id="intervention"
                    />
                  </div>
                  <div class="form-group">
                    <label for="timeSlot">Waktu Slot:</label>
                    <input
                      v-model="formData.timeSlot"
                      type="text"
                      class="form-control"
                      id="timeSlot"
                    />
                  </div>
                  <div class="form-group">
                    <label for="evaluation">Evaluasi:</label>
                    <input
                      v-model="formData.evaluation"
                      type="text"
                      class="form-control"
                      id="evaluation"
                    />
                  </div>
                  <div class="form-group">
                    <label for="paidStatus">Status Pembayaran:</label>
                    <select v-model="formData.paidStatus" class="form-control" id="paidStatus">
                      <option value="true">Lunas</option>
                      <option value="false">Belum Lunas</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'EditMR',
  created() {
    // Panggil method atau fungsi untuk mendapatkan data rekam medis dari server
    this.fetchDetailMedicalRecord(this.$route.params.id)
  },
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
        evaluation: ''
      }
    }
  },
  computed: {
    ...mapState(useCounterStore, ['mr'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchDetailMedicalRecord', 'editMedicalRecord']),
    updateMR() {
      // Panggil method atau fungsi untuk mengirim perubahan data pasien ke server
      this.editMedicalRecord({
        data: this.formData,
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.fetchDetailMedicalRecord()
  }
}
</script>
