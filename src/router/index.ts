import {createRouter, createWebHistory} from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardView from '@/components/dashboard/DashboardView.vue'
import {useUserTokenStore} from '@/stores/userloginToken'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/login/LoginView.vue')
        },
        {
            path: '/',
            name: 'home',
            meta: {requiresAuth: true},
            component: AppLayout,
            children: [
                {
                    path: '/:xxx(.*)*',
                    name: 'ErrorPage',
                    component: () => import('@/components/ErrorPage.vue')
                },
                {
                    path: '/',
                    name: 'Dashboard',
                    component: DashboardView
                },
                {
                    path: '/shop/list',
                    name: 'shop-list',
                    component: () => import('@/components/shop/ShopListView.vue')
                },
                {
                    path: '/commodity/list',
                    name: 'commodity-list',
                    component: () => import('@/components/commodity/CommodityListView.vue')
                },
                {
                    path: '/advertise/list',
                    name: 'advertise-list',
                    component: () => import('@/components/advertise/AdvertiseListView.vue')
                },
                {
                    path: '/users/list',
                    name: 'user-list',
                    component: () => import('@/components/user/UserListView.vue')
                },
                {
                    path: '/users/detail/:id',
                    name: 'user-detail',
                    component: () => import('@/components/user/UserDetailView.vue')
                },
                {
                    path: '/users/edit/:id',
                    name: 'user-edit',
                    component: () => import('@/components/user/UserEditView.vue')
                },
                {
                    path: '/system',
                    name: 'system',
                    children: [
                        {
                            path: '/system/setting',
                            name: 'setting',
                            component: () => import('@/components/system/SettingView.vue')
                        },
                        {
                            path: '/system/menus',
                            name: 'menu-list',
                            component: () => import('@/components/system/menu/MenuListView.vue')
                        },
                        {
                            path: '/system/menus/create',
                            name: 'menu-create',
                            component: () => import('@/components/system/menu/MenuCreateView.vue')
                        },
                        {
                            path: '/system/menus/:id/detail',
                            name: 'menu-detail',
                            component: () => import('@/components/system/menu/MenuDetailView.vue')
                        },
                        {
                            path: '/system/menus/:id/edit',
                            name: 'menu-edit',
                            component: () => import('@/components/system/menu/MenuEditView.vue')
                        },
                        {
                            path: '/system/roles',
                            name: 'roles',
                            component: () => import('@/components/system/RoleView.vue')
                        }
                    ]
                },
                {
                    path: '/recycle/list',
                    name: 'recycle-list',
                    component: () => import('@/components/recycle/RecycleListView.vue')
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
                query: {redirect: to.fullPath}
            })
            return
        }
    }
    next()
})

export default router
