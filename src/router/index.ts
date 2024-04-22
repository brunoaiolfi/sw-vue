import Caching from '@/screens/caching/Caching.vue'
import Dashboard from '@/screens/dashboard/Dashboard.vue'
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/caching', name: 'caching', component: Caching,  },
]

export const router = createRouter({
  history: createMemoryHistory('/caching'),
  routes,
})