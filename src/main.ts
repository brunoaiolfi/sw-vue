import './assets/main.css'

import { createApp } from 'vue'
import Caching from './screens/caching/Caching.vue'
import { router } from './router';

createApp(Caching)
    .use(router)
    .mount('#app')