import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/Home/Home.vue')
        },
        {
            path: '/user',
            name: 'User',
            component: () => import('@/pages/User/User.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/Login/Login.vue')
        },
        {
            path: '/apply',
            name: 'Apply',
            component: () => import('@/pages/Apply/Apply.vue')
        },
        {
            path: '/finish',
            name: 'Finish',
            component: () => import('@/pages/Finish/Finish.vue')
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('@/pages/Admin/Admin.vue')
        },
        {
            path: '/loginout',
            name: 'Loginout',
            component: () => import('@/pages/Loginout/Loginout.vue')
        }
    ]
})

export default router
