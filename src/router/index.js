import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    component: ()=>import('../views/clientes')
  },
  {
    path: '/clientes/form',
    name: 'clientes.form',
    component: ()=>import('../views/clientes/form')
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: ()=>import('../views/pedidos')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
