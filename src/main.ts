import { createApp } from 'vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import routes from 'virtual:generated-pages'
import './assets/styles/globals.scss'
import './assets/styles/custom.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'



import App from './App.vue'
import MyLib from 'my-lib/my-lib'
import store from 'my-lib/utils/store'
import logo from './assets/logo.png'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(store, {
  settings:{
    logo: logo
  }
})
app.use(ElementPlus)
app.use(MyLib)

console.log(app)
app.mount('#app')
