import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Menu from '../views/Menu.vue'
import Cartera from '../views/Cartera.vue'
import Historial from '../views/Historial.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu
    },
    {
        path: '/cartera',
        name: 'Cartera',
        component: Cartera
    },
    {
        path: '/historial',
        name: 'Historial',
        component: Historial
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router