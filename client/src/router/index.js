import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/HomePage.vue';
import Login from '../components/pages/Login.vue';
import Register from '../components/pages/Register.vue';
import Auctions from '../components/pages/AuctionList.vue';
import AuctionPage from '../components/pages/AuctionPage.vue';
import Account from '../components/pages/Account.vue';
import Dashboard from '../components/pages/Dashboard.vue';
import AboutUs from '../components/pages/AboutUs.vue';

export const isAuthenticated = () => {
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

export const getUserRole = () => {
    const token = localStorage.getItem('jwt');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    } catch (error) {
        return null;
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
        meta: { requiresAuth: true },
    },
    {
        path: '/auctions',
        name: 'Auctions',
        component: Auctions,
        meta: { requiresAuth: true },
    },
    {
        path: '/auctions-admin',
        name: 'Auctions',
        component: Auctions,
        meta: { requiresAuth: true , requiresRole: 'user'},
    },
    {
        path: '/auction-page/:id',
        name: 'AuctionPage',
        component: AuctionPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: { requiresAuth: true },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, requiresRole: 'admin' },
    },
    {
        path: '/about-us',
        name: 'AboutUs',
        component: AboutUs,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else if (to.meta.requiresRole) {
        const userRole = getUserRole();

        if (userRole !== to.meta.requiresRole) {
            next('/home');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
