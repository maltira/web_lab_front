import './assets/styles/main.scss'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// TODO: router.beforeEach и ограничение на /admin

app.use(router)
app.use(pinia)

app.mount('#app')
