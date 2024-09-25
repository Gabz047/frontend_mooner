import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/auth/SignView.vue')
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('../views/ArtistDetailView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/searchview.vue')
    }
  ]
})

export default router
