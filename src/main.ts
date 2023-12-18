import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getCsrfToken } from '@/utils/csrfService';

import '@/assets/app.scss'

import axios from 'axios';
import { cs } from 'element-plus/es/locales.mjs';

const setupAxiosCsrfToken = async () => {
    const csrfToken = await getCsrfToken();
    if (csrfToken.data && csrfToken.status === 200) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.data;
    }
};

setupAxiosCsrfToken();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
