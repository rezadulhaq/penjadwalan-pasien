<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'Navbar',
  computed: { ...mapState(useCounterStore, ['isLogin', 'name']) },
  methods: {
    ...mapActions(useCounterStore, ['logout']),
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Logo on the left -->
      <a class="navbar-brand" href="/">
        <img src=../assets/re-covery.jpeg alt="Your Logo" width="120" height="70">
      </a>

      <!-- Toggle button for small screens -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu items -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li>
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/jadwal" class="nav-link">Jadwal Praktek</RouterLink>
          </li>
          <li>
            <RouterLink to="/patient-list" class="nav-link">Data Pasien</RouterLink>
          </li>
          <li>
            <RouterLink to="/rekap-bulanan" class="nav-link">Rekap Bulanan</RouterLink>
          </li>
          <li>
            <RouterLink to="/grafik-bulanan" class="nav-link">Grafik Bulanan</RouterLink>
          </li>
          <li>
            <RouterLink to="/medical-record-list" class="nav-link">Medical Record</RouterLink>
          </li>
          <li>
            <RouterLink to="/paket" class="nav-link">Data Paket</RouterLink>
          </li>
        </ul>
      </div>

      <!-- User name and logout button on the right -->
      <div class="d-flex collapse" id="navbarNavAltMarkup">
        <a v-if="isLogin" class="navbar-brand text-primary"><h4>{{ name }}</h4></a>
        <div v-if="isLogin" class="navbar-nav ms-auto">
          <button class="btn btn-danger" @click.prevent="logout">Log Out</button>
        </div>
        <div v-if="!isLogin" class="navbar-nav">
          <router-link class="btn btn-success" to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Add hover effect */
.navbar-nav .nav-link:hover {
  background-color: #e9ecef;
  color: #000;
}

/* Custom styles for the navbar */
.navbar {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-brand img {
  border-radius: 50%;
}

.navbar-toggler-icon {
  background-color: #17a2b8;
}

.navbar-toggler {
  border: none;
}

.navbar-nav .nav-link {
  color: #333;
}

.navbar-nav .nav-link.active {
  color: #007bff;
}

.navbar-nav .nav-link:hover {
  background-color: #f8f9fa;
  color: #007bff;
}

.navbar-brand.text-primary {
  color: #007bff;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #c82333;
}
</style>
