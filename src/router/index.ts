import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      hideHeader: false,
    }
  },
  {
    path: '/admin',
    name: 'Admin-panel',
    component: AdminView,
    meta: {
      hideHeader: false,
    },
    beforeEnter
  },
  {
    path: '/auth',
    name: 'Authorization',
    component: LoginView,
    meta: {
      hideHeader: true,
    }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router