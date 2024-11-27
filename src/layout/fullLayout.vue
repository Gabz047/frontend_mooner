<script setup>
import { RouterView } from 'vue-router';
import NavigationHeader from '@/components/layout/header/NavigationHeader.vue';
import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
import { usePlaylistStore, useUserStore, useLoginStore, useCommunityStore } from '@/stores';
import { returnActive } from '@/utils/music/music';
import { onMounted, shallowRef } from 'vue';
const playlistStore = usePlaylistStore()
const communityStore = useCommunityStore()
const getWidthScreen = shallowRef(null)

onMounted(()=>{
  getWidthScreen.value = window.innerWidth
  console.log(getWidthScreen.value)
})
</script>
<template>
     <main :class="getWidthScreen > 1024 ? 'w-dvw h-dvh grid grid-rows-2 grid-cols-[23%_77%] xl:grid-cols-[8%_92%]' : 'w-dvw h-dvh'" >
    <div class=" relative col-start-1 col-end-1 w-full xl:hidden">
   <NavigationHeader class="fixed z-40 duration-150" :data_community="communityStore.communitysByAutor" :data_playlist="playlistStore.playlistsByOwner" :class="returnActive == 'home' ? 'w-[23%]' : 'w-[28%]'" />
    </div>
    

   <section class="col-start-2 xl:col-start-1 col-end-3 row-start-1 row-end-3 min-w-full min-h-full flex flex-col items-center lg:flex" >
    <HeaderGlobal :is_blink_layout="false" />
    <RouterView class=" min-h-full min-w-full" />
  </section>
  </main>
</template>