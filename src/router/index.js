import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const token = localStorage.getItem('access')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "fullLayout",
      component: () => import('../layout/fullLayout.vue'),
      meta: {
        auth: true
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          
        },
        
        {
          path: '/artist/:id',
          name: 'artist',
          component: () => import('../views/ArtistDetailView.vue'),
        
        },
       
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/SearchView.vue'),
          
        },
        {
          path: '/beanartist',
          name: 'beartist',
          component: () => import('../views/BeAnArtistView.vue')
        },
        { 
          path: '/:pathMatch(.*)*', 
          name: 'NotFound', 
          component: ()=> import('../views/NotFound.vue'),
          meta: {
            auth: false
          }
        },
      ],
    },
    {
      path: '/beanartist',
      name: 'beartist',
      component: () => import('../views/BeAnArtistView.vue')
    },
    {
      path: '/artistpainel',
      name: 'artistpainel',
      component: () => import('../views/ArtistPainelView.vue')
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: ()=> import('../views/NotFound.vue')
    },
      path: "/",
      name: "blankLayout",
      component: () => import('../layout/blankLayout.vue'),
      children: [
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
      ]
    },
  ]
})
export default router