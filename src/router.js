import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';
import SingOnPage from './components/SingOnPage.vue';
import AddEvent from './components/AddEvent.vue';
import EventList from './components/EventList.vue';

const routes = [

    {
        path: '/home-page',
        component: HomePage,
        name: 'HomePage'
    },

    {
        path: '/',
        component: LoginPage,
        name: 'LoginPage'
    },

    {
        path: '/sing-on-page',
        component: SingOnPage,
        name: 'SingOnPage'
    },

    {
        path: '/add-event',
        component: AddEvent,
        name: 'AddEvent'
    },

    {
        path: '/event-list',
        component: EventList,
        name: 'EventList'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;