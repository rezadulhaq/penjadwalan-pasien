<script>
import { mapWritableState } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
  computed: {
    ...mapWritableState(useCounterStore, ["isLogin", "name"]),
  },
  data() {
    return {
      showSplashScreen: true,
      loadingType: 'loading-linear'
    };
  },
  mounted() {
    this.startCountdown();

    // setTimeout(() => {
    //   console.log(this.showSplashScreen);
    //   console.log("berjalan mounted");
    //   this.showSplashScreen = false;
    //   console.log(this.showSplashScreen);
    // }, 6000); // 10 detik
  },
  methods:{
    startCountdown() {
      setTimeout(() => {
        // Hide splash screen after 5 seconds
        this.showSplashScreen = false;
      }, 5000); // 5 detik
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
      this.name = localStorage.getItem("name");
    }
  },
};
</script>

<template>
  <!-- <Navbar /> -->
  <div v-if="showSplashScreen" class="splash-screen">
    <!-- Loading animation for 5 seconds -->
    <div class="loading-container">
      <!-- Gunakan class "loading-linear" untuk animasi loading lurus -->
      <!-- atau gunakan class "loading-spiral" untuk animasi loading spiral -->
      <div :class="[loadingType, 'loading']"></div>
    </div>
    
    <!-- Banner and welcome message -->
    <div class="banner">
      <p>Selamat Datang di RE-COVERY!</p>
      <img src="./assets/re-covery.jpeg" alt="Banner" />
    </div>
  </div>
  <div v-else class="container-fluid">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
.splash-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loading-container {
  position: relative;
  width: 60px;
  height: 60px;
}

.loading {
  border: 6px solid #3498db;
  border-top: 6px solid #ffffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.loading-spiral {
  animation: spiral 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spiral {
  0% { clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 0%); }
  25% { clip-path: polygon(50% 25%, 25% 25%, 25% 75%, 75% 75%, 75% 25%, 50% 25%); }
  50% { clip-path: polygon(50% 50%, 0% 50%, 0% 100%, 100% 100%, 100% 0%, 50% 0%); }
  75% { clip-path: polygon(50% 75%, 25% 75%, 25% 100%, 75% 100%, 75% 50%, 50% 75%); }
  100% { clip-path: polygon(50% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 100%); }
}

.banner {
  text-align: center;
  margin-top: 20px;
}

.banner img {
  max-width: 100%;
  height: auto;
}

.banner p {
  font-size: 1.5em;
  margin-top: 10px;
}
</style>