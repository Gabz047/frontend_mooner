<script setup>
import { RouterView } from 'vue-router';
import NavigationHeader from '@/components/layout/header/NavigationHeader.vue';
import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
import { usePlaylistStore, useUserStore, useLoginStore } from '@/stores';
import { returnActive } from '@/utils/music/music';
const playlistStore = usePlaylistStore()

</script>
<template>
     <main class="w-dvw h-dvh grid grid-rows-2 grid-cols-[23%_77%]">
    <div class="relative col-start-1 col-end-1 w-full">
   <NavigationHeader class="fixed z-40 duration-150" :data_playlist="playlistStore.playlistsByOwner" :class="returnActive == 'home' ? 'w-[23%]' : 'w-[28%]'" />
    </div>

   <section class="col-start-2 col-end-3 row-start-1 row-end-3 min-w-full min-h-full flex flex-col items-center" >
   <HeaderGlobal  />
  <RouterView class=" min-h-full min-w-full" />
  </section>
  </main>
</template>