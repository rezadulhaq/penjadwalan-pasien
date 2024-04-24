  <template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Rekap Kedatangan Pasien Bulanan</h1>
      <div class="mb-3">
        <label for="selectedYear">Pilih Tahun:</label>
        <select v-model="selectedYear" @change="fetchMonthlyData(selectedYear)" class="form-control" id="selectedYear">
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <canvas ref="chart" width="400" height="200"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import axios from 'axios';
  
  export default {
    name: 'RekapBulanan',
    data() {
      const currentYear = new Date().getFullYear();
      const allYears = Array.from({ length: currentYear +10 - 2000 + 1 }, (_, index) => 2000 + index);
  
      return {
        chart: null,
        selectedYear: new Date().getFullYear(),
        availableYears: allYears, // Tidak perlu memberikan daftar tahun awal
        monthlyData: [],
      };
    },
    mounted() {
      Chart.register(...registerables);
      this.fetchMonthlyData(this.selectedYear); // Tambahkan parameter tahun saat memanggil fungsi
    },
    methods: {
      async fetchMonthlyData(year) {
        try {
          const response = await axios.get(`https://re-covery-production.up.railway.app/user/rekapbulanan/${year}`);
          // this.availableYears = response.data.years;
          this.selectedYear = year;
          this.monthlyData = response.data.data;
          console.log(response.data.data, this.availableYears[0], "<<<<<<<<<");
          this.updateChart();
        } catch (error) {
          console.error('Error fetching monthly data:', error);
        }
      },
      updateChart() {
        if (this.chart) {
          this.chart.destroy(); // Hancurkan grafik sebelum membuat yang baru
        }
  
        this.chart = new Chart(this.$refs.chart.getContext('2d'), {
          type: 'bar',
          data: {
            labels: this.getMonthLabels(),
            datasets: [
              {
                label: `Jumlah Kedatangan Pasien - Tahun ${this.selectedYear}`,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: this.monthlyData,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      getMonthLabels() {
        return [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];
      },
    },
  };
  </script>
  