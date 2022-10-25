import { createApp, markRaw } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
// 如果你使用的 Vite，你可以使用 unplugin-vue-components 来进行按需加载。但是此插件无法处理非组件模块，如 message，这种组件需要手动加载
// https://www.antdv.com/docs/vue/getting-started-cn
import 'ant-design-vue/es/message/style/css'
import './css/global.scss'

const app = createApp(App)
//
app.use(router)
//
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia)

app.mount('#app')
