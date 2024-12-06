import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/HomePage.vue';
import Auctions from '../components/pages/AuctionList.vue';

const routes = [
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
