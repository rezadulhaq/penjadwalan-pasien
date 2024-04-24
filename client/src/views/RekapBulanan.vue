<template>
  <div class="container mt-5">
    <h1 class="mb-4">Export Data to Excel</h1>
    <div class="row mb-3">
      <div class="col-md-3">
        <label class="form-label">Start Date:</label>
        <input type="date" class="form-control" v-model="startDate" />
      </div>
      <div class="col-md-3">
        <label class="form-label">End Date:</label>
        <input type="date" class="form-control" v-model="endDate" />
      </div>
      <div class="col-md-2">
        <label class="form-label invisible">Filter</label>
        <button @click="handleSubmit" class="btn btn-primary">Filter Data</button>
      </div>
      <div class="col-md-2" v-if="mrecord.length > 0">
        <label class="form-label invisible">Export</label>
        <button @click="exportToExcel" class="btn btn-success">Export to Excel</button>
      </div>
    </div>
    <div class="table-responsive" v-if="filteredData.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient ID</th>
            <th>Physio ID</th>
            <th>Complaint</th>
            <th>Arrival Date</th>
            <th>Diagnosis</th>
            <th>Intervention</th>
            <th>Time Slot</th>
            <th>Evaluation</th>
            <th>Paid Status</th>
            <th>Physio Name</th>
            <th>Physio Address</th>
            <th>Physio Phone Number</th>
            <th>Total Income</th>
            <th>Medical Record Number</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Patient Address</th>
            <th>Email</th>
            <th>Patient Phone Number</th>
            <th>City</th>
            <th>Place of Birth</th>
            <th>Date of Birth</th>
            <th>Occupation</th>
            <th>Ticket</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="index">
            <td>{{ item.arrivalDate }}</td>
            <td>{{ item.PatientId }}</td>
            <td>{{ item.PhysioId }}</td>
            <td>{{ item.complaint }}</td>
            <td>{{ item.arrivalDate }}</td>
            <td>{{ item.diagnosis }}</td>
            <td>{{ item.intervention }}</td>
            <td>{{ item.timeSlot }}</td>
            <td>{{ item.evaluation }}</td>
            <td>{{ item.paidStatus }}</td>
            <td>{{ item.physioName }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.totalIncome }}</td>
            <td>{{ item.medicalRecordNumber }}</td>
            <td>{{ item.patientName }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.patientAddress }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.patientPhoneNumber }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.placeOfBirth }}</td>
            <td>{{ item.dateOfBirth }}</td>
            <td>{{ item.occupation }}</td>
            <td>{{ item.ticket }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No data available for the selected date range.</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as XLSX from 'xlsx'
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      dataToExport: [
        { date: '2024-01-01', value: 'Data 1' },
        { date: '2024-01-02', value: 'Data 2' },
        { date: '2024-01-03', value: 'Data 3' }
        // ...
      ],
      filteredData: []
    }
  },
  computed: {
    ...mapState(useCounterStore, ['mrecord'])
  },
  // mounted(){
  //   this.filteredData = this.mrecord.map(function (el) {
  //       return {
  //         PatientId: el.PatientId,
  //         PhysioId: el.PhysioId,
  //         complaint: el.complaint,
  //         arrivalDate: el.arrivalDate,
  //         diagnosis: el.diagnosis,
  //         intervention: el.intervention,
  //         timeSlot: el.timeSlot,
  //         evaluation: el.evaluation,
  //         paidStatus: el.paidStatus,
  //         physioName: el.Physio.name,
  //         address: el.Physio.address,
  //         phoneNumber: el.Physio.phoneNumber,
  //         totalIncome: el.Physio.totalIncome,
  //         medicalRecordNumber: el.Patient.medicalRecordNumber,
  //         patientName: el.Patient.name,
  //         gender: el.Patient.gender,
  //         address: el.Patient.address,
  //         email: el.Patient.email,
  //         phoneNumber: el.Patient.phoneNumber,
  //         city: el.Patient.city,
  //         placeOfBirth: el.Patient.placeOfBirth,
  //         dateOfBirth: el.Patient.dateOfBirth,
  //         occupation: el.Patient.occupation,
  //         ticket: el.Patient.ticket,
  //       }
  //     })

  //   },
  //   created(){

  //     console.log(this.filteredData, "<<<<<<<<<<<");
  //   },
    methods: {
      ...mapActions(useCounterStore, ['fetchMedicalRecordsByDate']),
      async handleSubmit() {
      try {
        await this.fetchMedicalRecordsByDate({ startDate: this.startDate, endDate: this.endDate })
        this.filteredData = this.mrecord.map(function (el) {
          return {
            PatientId: el.PatientId,
            PhysioId: el.PhysioId,
            complaint: el.complaint,
            arrivalDate: el.arrivalDate,
            diagnosis: el.diagnosis,
            intervention: el.intervention,
            timeSlot: el.timeSlot,
            evaluation: el.evaluation,
            paidStatus: el.paidStatus,
            physioName: el.Physio.name,
            address: el.Physio.address,
            phoneNumber: el.Physio.phoneNumber,
            totalIncome: el.Physio.totalIncome,
            medicalRecordNumber: el.Patient.medicalRecordNumber,
            patientName: el.Patient.name,
            gender: el.Patient.gender,
            patientAddress: el.Patient.address, // Ubah nama properti agar tidak tumpang tindih
            email: el.Patient.email,
            patientPhoneNumber: el.Patient.phoneNumber, // Ubah nama properti agar tidak tumpang tindih
            city: el.Patient.city,
            placeOfBirth: el.Patient.placeOfBirth,
            dateOfBirth: el.Patient.dateOfBirth,
            occupation: el.Patient.occupation,
            ticket: el.Patient.ticket,
          };
        });
      } catch (error) {
        // Handle error jika diperlukan
        console.error(error);
      }
    },
    filterData() {
      this.filteredData = this.dataToExport.filter((item) => {
        const itemDate = moment(item.date)
        return itemDate.isSameOrAfter(this.startDate) && itemDate.isSameOrBefore(this.endDate)
      })
    },
    exportToExcel() {
      console.log(this.filteredData, "<<<<<<<<<<<<<<");
      if (this.filteredData.length > 0) {
        const ws = XLSX.utils.json_to_sheet(this.filteredData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Data')
        XLSX.writeFile(wb, `rekap_data_${this.startDate}_to_${this.endDate}.xlsx`)
      } else {
        alert('No data available for the selected date range.')
      }
    }
  }
}
</script>

<style scoped>
/* Styling tambahan dapat ditambahkan di sini */
</style>
