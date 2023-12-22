import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import IndexView from '@/views/IndexView.vue'
import { useUserTokenStore } from '@/stores/userloginToken'

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
      meta: { requiresAuth: true },
      component: AppLayout,
      children: [
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('@/components/ErrorPage.vue')
        },
        {
          path: '/',
          name: 'index',
          component: IndexView
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta?.requiresAuth)) {
    const store = useUserTokenStore()
    if (!store.token.access_token) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  next()
})

export default router
