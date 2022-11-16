import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
const routes = [
    {
        path: '/',
        component: () => import('./pages/Home/Index.vue'),
        redirect: '/dashboard',
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/dashboard',
                component: () => import('./pages/Home/Dashboard.vue')
            },
            {
                path: '/profile',
                component: () => import('./pages/Home/Profile.vue')
            },
            {
                path: '/people',
                component: () => import('./pages/Home/People.vue')
            },
            {
                path: '/groups',
                component: () => import('./pages/Home/Groups.vue')
            },
        ]
    },
    {
        path: '/about',
        component: () => import('./pages/About.vue')
    },
    {
        path: '/login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/register',
        component: () => import('./pages/Register.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.getAccount) {
            next();
            return;
        } else {
            next("/login");
        }
    } else {
        next();
    }
});


export default router