import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/HomePage.vue';
import Login from '../components/pages/Login.vue';
import Register from '../components/pages/Register.vue';
import Auctions from '../components/pages/AuctionList.vue';
import AuctionPage from '../components/pages/AuctionPage.vue';
import Account from '../components/pages/Account.vue';

const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isTokenExpired = payload.exp * 1000 < Date.now();
        return !isTokenExpired;
    } catch (error) {
        return false;
    }
};

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next('/home');
            } else {
                next();
            }
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next('/home');
            } else {
                next();
            }
        },
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: false },
    },
    {
        path: '/auctions',
        name: 'Auctions',
        component: Auctions ,
        meta: { requiresAuth: false },
    },
    {
        path: '/auction-page',
        name: 'AuctionPage',
        component: AuctionPage ,
        meta: { requiresAuth: false },
    },
    {
        path: '/account',
        name: 'Account',
        component: Account ,
        meta: { requiresAuth: false },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
});

export default router;
