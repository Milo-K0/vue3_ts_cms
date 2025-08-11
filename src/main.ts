import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import router from './router'
import registerIcons from './global/register-icons'
import store from './store'

// 针对ELMessage 和 ElLoading 等组件引入样式
// 1. 组件全局引入
// import 'element-plus/dist/index.css'
// 2. 组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
// 3. 使用vite-plugin-style-import

const app = createApp(App)
app.use(store)
app.use(router)
app.use(registerIcons)
app.mount('#app')
