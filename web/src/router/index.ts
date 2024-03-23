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
        }
    ]
})

export default router
