import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import yuwindow from 'yuwindow'
createApp(App).use(store).use(router).use(yuwindow).mount('#app')
