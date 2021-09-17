import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

app.use(PrimeVue)


createApp(App).use(store).use(router).mount('#app')
