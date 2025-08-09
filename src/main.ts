import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

// 针对ELMessage 和 ElLoading 等组件引入样式
// 1. 组件全局引入
// import 'element-plus/dist/index.css'
// 2. 组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
// 3. 使用vite-plugin-style-import

createApp(App).use(router).use(pinia).use(registerIcons).mount('#app')
