import { createRouter, createWebHistory } from 'vue-router'

import Register from '../views/Register'
import Login from '../views/Login'
import Home from '../views/HomeView'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'HomeView',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
