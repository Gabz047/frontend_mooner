<script setup>
import {computed, onMounted, ref} from 'vue'
import { RouterView } from 'vue-router'
import HeaderGlobal from './components/global/HeaderGlobal.vue';
import { useLoginStore } from './stores/user/login';
import NavigationHeader from './components/layout/header/NavigationHeader.vue';
import { returnActive } from './utils/music/music';
import router from './router';
const store = useLoginStore()

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
  switch (router.currentRoute.value.path) {
    case '/':
      return 'flex-col col-start-2 col-end-2 row-start-1 row-end-2'
    case '/login': 
    return 'col-start-1 col-end-3 row-start-1 row-end-2'
  }
  })
</script>

<template>
   <main class="w-dvw h-dvh grid grid-rows-2 grid-cols-[23%_77%]">
    <div class="relative col-start-1 col-end-1 w-full">
   <NavigationHeader v-if="router.currentRoute.value.path != '/login'" class="fixed z-40 duration-150" :data_header="data_header" :class="returnActive == 'home' ? 'w-[23%]' : 'w-[28%]'" />
    </div>

   <section class="w-full flex" :class="currentPage" >
   <HeaderGlobal v-if="router.currentRoute.value.path != '/login'"  />
  <RouterView />
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

