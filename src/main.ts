import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { context } from '@/application'
context.getConfig()

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
