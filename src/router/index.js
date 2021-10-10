import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import guest from '../middleware/guest'
import checkAuth from '../middleware/checkAuth'
import auth from '../middleware/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: [auth]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ()=>import('../views/clientes'),
    beforeEnter: [auth]
  },
  {
    path: '/clientes/form',
    name: 'clientes.form',
    component: ()=>import('../views/clientes/form'),
    beforeEnter: [auth]
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: ()=>import('../views/pedidos'),
    beforeEnter: [auth]
  },
  {
    path: '/pedidos/form/:id?',
    name: 'pedidos.form',
    component: ()=>import('../views/pedidos/form'),
    beforeEnter: [auth]
  },
  {
    path: '/login',
    name: 'auth.login',
    component: ()=>import('../views/auth/login'),
    beforeEnter: [checkAuth,guest],
  },
  {
    path: '/registrarme',
    name: 'auth.registrarme',
    component: () => import('../views/auth/registrarme')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
