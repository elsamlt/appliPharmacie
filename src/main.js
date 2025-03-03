import { createApp } from "vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Importer Material Design Icons
import "@mdi/font/css/materialdesignicons.css";

// Components
import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // S'assurer que Vuetify utilise bien MDI
  },
});

createApp(App).use(vuetify).mount("#app");
