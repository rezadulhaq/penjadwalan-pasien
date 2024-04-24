import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/paket',
      name: 'dataPaket',
      component: () => import('../views/DataPaket.vue')
    },
    {
      path: '/rekap-bulanan',
      name: 'rekapBulanan',
      component: () => import('../views/RekapBulanan.vue')
    },
    {
      path: '/grafik-bulanan',
      name: 'grafikBulanan',
      component: () => import('../views/GrafikBulanan.vue')
    },
    {
      path: '/jadwal',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue')
    },
    {
      path: '/patient-list',
      name: 'patientList',
      component: () => import('../views/PattientList.vue')
    },
    {
      path: '/detail-patient/:id',
      name: 'DetailPatient',
      component: () => import('../views/PatientDetailView.vue')
    },
    {
      path: '/patient/edit/:id',
      name: 'EditPatient',
      component: () => import('../views/EditPatient.vue')
    },
    {
      path: '/medical-record-list',
      name: 'MedicalRecordList',
      component: () => import('../views/MedicalRecordView.vue')
    },
    {
      path: '/medical-record/:id',
      name: 'MedicalRecordDetail',
      component: () => import('../views/MRDetailView.vue')
    },
    {
      path: '/medical-record/edit/:id',
      name: 'EditMR',
      component: () => import('../views/EditMR.vue')
    },
    {
      path: '/add-patient',
      name: 'AddPatient',
      component: () => import('../views/AddPatient.vue')
    },
    {
      path: '/add-medical-record',
      name: 'AddMedicalRecord',
      component: () => import('../views/AddMedicalRecord.vue')
    },
    {
      path: '/add-fisio',
      name: 'AddFisio',
      component: () => import('../views/AddFisio.vue')
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   const access_token = localStorage.getItem('access_token');

//   if (to.name !== 'splash') {
//     // Jika bukan splash screen, tampilkan splash screen terlebih dahulu
//     next({ name: 'splash' });
//   } 
//   // else if (to.name === 'home' && !access_token) { //else if (to.name === 'home' && !access_token) {
//   //   // Jika menuju halaman utama dan tidak ada token akses, arahkan ke login
//   //   next({ name: 'login' });
//   // } 
//   else {
//     // Untuk kasus lain, lanjutkan ke rute yang diminta
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   const access_token = localStorage.getItem("access_token");

//   if (to.name === "home") {
//     if (access_token) {
//       next();
//     } else {
//       next({ name: "login" });
//     }
//   } else {
//     next();
//   }

//   if (to.name === "login" && to.name === "register") {
//     if (!access_token) {
//       next();
//     } else {
//       next({ name: "home" });
//     }
//   }
// });

export default router
