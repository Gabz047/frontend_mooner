import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'Minha Biblioteca',
          component: HomeView
        },
        {
          path: '/:genre',
          name: 'genre',
          component: () => import('../views/GenreView.vue')
        },
        {
          path: '/artist/:id',
          name: 'artist',
          component: () => import('../views/ArtistDetailView.vue')
        },
        {
          path: '/artistpainel',
          name: 'artistpainel',
          component: () => import('../views/ArtistPainelView.vue')
        },
        
        {
          path: '/plans',
          name: 'plans',
          component: () => import('../views/PlansView.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/artistDetail/:id',
          name: 'artist',
          component: () => import('../views/ArtistView.vue'),
          props: true
        },
        {
          path: '/musics',
          name: 'musics',
          component: () => import('../views/home/HomeMusicsView.vue')
        },
        {
          path: '/playlists',
          name: 'playlists',
          component: () => import('../views/home/HomePlaylistsView.vue')
        },
        {
          path: '/artists',
          name: 'artists',
          component: () => import('../views/home/HomeArtistsView.vue')
        },
        {
          path: '/luuna',
          name: 'luuna',
          component: () => import('../views/LuunaView.vue')
        },
        {
          path: '/connect-moon/:email',
          name: 'connect-moon',
          component: () => import('../views/ConnectMoonWave.vue')
        },
        {
          path: '/navigation',
          name: 'Navegar',
          component: () => import('../views/Mooner/NavigationView.vue')
        },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue')
      },
      {
        path: '/createcommunity',
        name: 'comunity',
        component: () => import('../views/ComunityCreateView.vue')
      },
      {
        path: '/community/:id',
        name: 'community',
        component: () => import('../views/CommunityPostsView.vue')
      },
      {
          path: '/login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
          meta: {
            auth: false
          }
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: () => import('../views/auth/SignView.vue'),
          meta: {
            auth: false
          }
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
          path: '/plans/payments',
          name: 'payments',
          component: () => import('../views/PaymentsView.vue'),
          meta: {
            auth: true
          }
        },

        {
          path: '/historico',
          name: 'Historico',
          component: () => import('../views/HistoryView.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('../views/NotFound.vue')
        },
        {
          path: '/beanartist',
          name: 'beartist',
          component: () => import('../views/BeAnArtistView.vue')
        },
        {
          path: '/playlist/:id',
          name: 'playlist',
          component: () => import('../views/Mooner/PlaylistView.vue')
        },
      ]
})

export default router
