<script setup>
import {computed, onMounted, ref} from 'vue'
import { RouterView } from 'vue-router'
import HeaderGlobal from './components/global/HeaderGlobal.vue';
import { useLoginStore } from './stores/user/login';
import { usePlaylistStore, useUserStore } from './stores';
import NavigationHeader from './components/layout/header/NavigationHeader.vue';
import { data_playlist, returnActive } from './utils/music/music';
import router from './router';
const loginStore = useLoginStore()
const userStore = useUserStore()
const playlistStore = usePlaylistStore()

const data_header = ref({
  playlists: [
    {img: '', title: 'Piuzinho Br', creator: 'Renas'},
    {img: '', title: 'Zikinha Terp', creator: 'Terp'},
    {img: '', title: 'Droga é o izaque nego', creator: 'Izaque'}
  ],
  following: [
    {img: '', title: 'Matuê'},
    {img: '', title: 'Ryu The Runner'},
    {img: '', title: 'MatzeraSuvery'},
    {img: '', title: 'Higor3kmDePe'}
  ],
  community: [
    {img: '', title: 'Casa do ryu wessir', people: '20.000'},
    {img: '', title: 'Matue fanbase', people: '40.000'},
    {img: '', title: 'Haters do Oruam', people: '100.000.000'},
    {img: '', title: 'Haters do Oruam', people: '100.000.000'},
    {img: '', title: 'Haters do Oruam', people: '100.000.000'},
    {img: '', title: 'Haters do Oruam', people: '100.000.000'}
  ]
})

const setStyle = ref('')

// router.beforeEach((to, from, next) => {
//   if (to.path == '/login' ||)
// })


const currentPage = computed(()=> {
  if (router.currentRoute.value.path != '/login' && router.currentRoute.value.path != '/sign-up' && router.currentRoute.value.path != '/plans') {
  return 'flex-col col-start-2 col-end-2 row-start-1 row-end-3'
  } else {
  return 'col-start-1 col-end-3 row-start-1 row-end-3'
  }
  })

  const verifyCurrentPage = computed(()=> {
  if (router.currentRoute.value.path != '/login' && router.currentRoute.value.path != '/sign-up' && router.currentRoute.value.path != '/plans') {
  return true
  } else {
  return false
  }
  })

  onMounted(async()=>{
    await userStore.getUser(loginStore.access)
    
    await playlistStore.getPlaylistsByOwner(userStore.myuser.id, loginStore.access)
  })
</script>
<template>
   <main class="w-dvw h-dvh grid grid-rows-2 grid-cols-[23%_77%]">
    <div class="relative col-start-1 col-end-1 w-full">
   <NavigationHeader v-if="verifyCurrentPage" class="fixed z-40 duration-150" :data_playlist="playlistStore.playlistsByOwner" :class="returnActive == 'home' ? 'w-[23%]' : 'w-[28%]'" />
    </div>

   <section class="min-w-full min-h-full flex" :class="currentPage" >
   <HeaderGlobal class="bg-red-400" v-if="verifyCurrentPage && loginStore.access"  />
  <RouterView class=" min-h-full min-w-full" />
  </section>
  </main>
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>

