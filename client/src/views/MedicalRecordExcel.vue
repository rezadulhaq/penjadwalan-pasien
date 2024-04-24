<template>
  <div>
    <h1>Medical Records Report</h1>

    <!-- Date Range Selection -->
    <div>
      <label for="startDate">Start Date:</label>
      <input type="date" v-model="startDate" id="startDate" @input="fetchMedicalRecords" />

      <label for="endDate">End Date:</label>
      <input type="date" v-model="endDate" id="endDate" @input="fetchMedicalRecords" />
    </div>

    <!-- Download Button -->
    <button @click="downloadExcel">Download Excel</button>

    <!-- Medical Records Table -->
    <table v-if="mrecord.length" border="1">
      <thead>
        <tr>
          <th>No</th>
          <th>Patient Name</th>
          <th>Physio Name</th>
          <!-- Add more columns as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in mrecord" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ record.Patient.name }}</td>
          <td>{{ record.Physio.name }}</td>
          <!-- Display more record properties as needed -->
        </tr>
      </tbody>
    </table>

    <h2 v-else>No records found</h2>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'pinia'
import Swal from 'sweetalert2'

export default {
  computed: {
    ...mapState(useCounterStore, ['mrecord'])
  },
  data() {
    return {
      startDate: '',
      endDate: ''
    }
  },

  methods: {
    ...mapActions(useCounterStore, ['fetchMedicalRecordsByDate']),
    async fetchMedicalRecords() {
      try {
        const queryParams = new URLSearchParams()
        queryParams.append('startDate', this.startDate)
        queryParams.append('endDate', this.endDate)

        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/medicalrecords/range?${queryParams.toString()}`
        })

        // Update state using store
        this.$store.useCounterStore.setMRecord(data)
      } catch (error) {
        console.error(error)
        Swal.fire('Error fetching medical records')
      }
    },
    downloadExcel() {
      // Implement the logic to download data as Excel here
      // You can use a library like exceljs or similar for generating Excel files
      // Example: https://github.com/exceljs/exceljs#browser
      console.log('Download Excel button clicked')
    }
  }
}
</script>

<style scoped>
/* Add any necessary styles */
</style>
