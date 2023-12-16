import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from "@/components/layout/AppLayout.vue"
import IndexView from "@/views/IndexView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      children: [
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('@/components/ErrorPage.vue'),
        },
        {
          path: '',
          name: 'index',
          component: IndexView
        }
      ]
    }
  ]
})

export default router
