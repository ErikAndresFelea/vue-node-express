import { createRouter, createWebHistory } from 'vue-router'

import Register from '../views/Register'
import Login from '../views/Login'
import Home from '../views/Home'
import UpdateTranscription from '../views/UpdateTranscription'

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
    name: 'Home',
    component: Home
  },
  {
    path: '/update',
    name: 'UpdateTranscription',
    component: UpdateTranscription
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
