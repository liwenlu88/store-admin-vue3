import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

import '@/assets/app.scss'

// 引入vite-plugin-icons-icons脚本
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
