import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
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
          name: '运营概况',
          component: DashboardView
        },
        {
          path: '/shop/list',
          name: '店铺管理',
          component: () => import('@/components/shop/ShopListView.vue')
        },
        {
          path: '/commodity/list',
          name: '商品管理',
          component: () => import('@/components/commodity/CommodityListView.vue')
        },
        {
          path: '/advertise/list',
          name: '广告管理',
          component: () => import('@/components/advertise/AdvertiseListView.vue')
        },
        {
          path: '/users/list',
          name: '用户管理',
          component: () => import('@/components/user/UserListView.vue')
        },
        {
          path: '/system',
          name: '系统管理',
          children: [
            {
              path: '/system/setting',
              name: 'setting',
              component: () => import('@/components/system/SettingView.vue')
            },
            {
              path: '/system/menus',
              name: 'menu-list',
              component: () => import('@/components/system/menu/MenuView.vue')
            },
            {
              path: '/system/menus/create',
              name: 'menu-create',
              component: () => import('@/components/system/menu/MenuCreateView.vue')
            },
            {
              path: '/system/menus/:id/edit',
              name: 'menu-edit',
              component: () => import('@/components/system/menu/MenuEditView.vue')
            },
            {
              path: '/system/roles',
              name: '角色',
              component: () => import('@/components/system/RoleView.vue')
            }
          ]
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
