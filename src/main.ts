import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import https from "./utils/http"


const app = createApp(App);
app.config.globalProperties.$https = https;

app.mount('#app')

