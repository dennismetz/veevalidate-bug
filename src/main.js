import { createApp } from "vue"
import VeeValidatePlugin from "@/plugins/validation"
import App from "@/App.vue"

// init app
const app = createApp(App)

// add use statements
app.use(VeeValidatePlugin)

// mount app
app.mount('#app')

