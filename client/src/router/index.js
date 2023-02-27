import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
