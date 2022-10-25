import { createRouter, createWebHashHistory } from 'vue-router'
import Count0x from './views/Count0x.vue'
import { UserOutlined, VideoCameraOutlined, FormOutlined, TableOutlined } from '@ant-design/icons-vue'

const menus = [
  { path: '/', name: '16进制累加', icon: UserOutlined, component: Count0x },
  { path: '/page1', name: 'page1', icon: VideoCameraOutlined, component: Count0x },
  // { path: '/login', name: '用户登录', icon: UserOutlined, component: Login, meta: { noLayout: true } },
]
const devMenus = []

export const routes = [...menus, ...devMenus]
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
