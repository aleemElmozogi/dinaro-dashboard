import router from "@/router";
import { createPinia } from "pinia";
import type { App } from "vue";
import Toast, { POSITION } from "vue-toastification";

import "@/core/styles/index.scss";
import "vue-toastification/dist/index.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueform/multiselect/themes/default.css";
import "@/assets/index.css";

const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  rtl: true,
  hideProgressBar: true,
  closeOnClick: true,
  toastDefaults: {
    success: {
      toastClassName: "bg-green-500 text-white text-sm",
    },
    error: {
      toastClassName: "bg-red-500 text-white text-sm",
    },
    warning: {
      toastClassName: "bg-yellow-600 text-white text-sm",
    },
  },
};

function initializeApp(app: App) {
  app.use(Toast, toastOptions);
  app.use(createPinia());
  app.use(router);
  app.mount("#app");
}

export default initializeApp;
