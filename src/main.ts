import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import { ElContainer, ElMain, ElAside, ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import App from './App'
import './index.css'
import 'element-plus/lib/theme-chalk/el-message.css'
import 'normalize.css'

const app = createApp(App)

app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
const elComponents = [ElContainer, ElMain, ElAside]

const elPlugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification]

elComponents.forEach(component => app.component(component.name, component))
elPlugins.forEach(plugin => app.use(plugin as { install: () => void }))
// app.use(ElementPlus)
app.mount('#app')
