import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
// import vue3GoogleLogin from "vue3-google-login";

import App from "./App.vue";
import router from "./router";

// import './assets/main.css'

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// app.use(createPinia());
// app.use(vue3GoogleLogin, {
//   clientId:
//     "99638203002-467af0eu4q685f3321tb2lm329afmhk4.apps.googleusercontent.com",
// });
app.use(router);
app.use(pinia);

app.mount("#app");
