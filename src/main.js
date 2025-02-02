import { createApp } from 'vue'
import App from './App.vue'
//引入router
import router from './router'
//引入store
import store from './store'
//引入公共样式
import css from './assets/css/common.css'
//导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入particles粒子库
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim';
//引入icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入axios
import axios from 'axios'
//引入axios拦截器（为JWT token）
import '@/util/axios.config'

const app = createApp(App)


app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Particles, {
    init: async engine => {
        // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
        await loadSlim(engine); // or you can load the slim version from "tsparticles-slim" if don't need Shapes or Animations
    },
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 将axios挂载到全局
app.config.globalProperties.axios = axios
app.mount('#app')

