import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const token = localStorage.getItem('access')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta:{
        auth: false
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/auth/SignView.vue'),
      meta:{
        auth: false
      }
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('../views/ArtistDetailView.vue'),
      meta:{
        auth: true
      }
    },
    {
      path: '/plans',
      name: 'artist',
      component: () => import('../views/PlansView.vue'),
      meta:{
        auth: true
      }
    },
    {
      path: '/plans/payments',
      name: 'payments',
      component: () => import('../views/PaymentsView.vue'),
      meta:{
        auth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: {
        auth: true
      }
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: ()=> import('../views/NotFound.vue')
    },
  ]
})
export default router