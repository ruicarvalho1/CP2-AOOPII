import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/HomePage.vue';
import Auctions from '../components/pages/AuctionList.vue';
import AuctionPage from '../components/pages/AuctionPage.vue';
import Login from '../components/pages/Login.vue';
import Register from '../components/pages/Register.vue';
import Account from '../components/pages/Account.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login ,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/auctions',
        name: 'Auctions',
        component: Auctions ,
    },
    {
        path: '/auction-page',
        name: 'AuctionPage',
        component: AuctionPage ,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register ,
    },
    {
        path: '/account',
        name: 'Account',
        component: Account ,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
