<script setup>
import { ref } from 'vue';
import { useSongStore, useLoginStore, usePlaylistStore } from '@/stores/index'
import { useRoute } from 'vue-router';
const songStore = useSongStore()
const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()

const access = ref(loginStore.access)
const router = useRoute()

const id = router.params.id


</script>
<template>
  <main class=" w-full h-[80%] flex justify-end gap-4">
    
    <section class="my-auto mr-2 h-full  flex rounded-lg w-[98%] border-2 border-yellow-50 bg-[#121212]">

      <div class="w-4/12 h-full flex relative  rounded-lg"> 
        <div class="w-full h-full relative flex justify-center">
        <div class="absolute top-5 left-8 z-30 flex gap-3 items-center">
        <h2 class="text-white text-xl"> Playlist</h2>
        <i class="mdi mdi-eye text-white text-lg"></i>
        </div>
          <div class="w-[80%] h-[40%] absolute z-30 mt-24">
            <img class="w-full h-full relative" src="@/assets/images/imagemdefundologin.png" alt="">
        </div>
            <img class="w-full h-full relative" src="@/assets/images/imagemdefundologin.png" alt="">
            <div class="bg-black w-full h-full absolute top-0 opacity-70"></div>
        </div>
      </div>
      <div class="w-8/12 bg-red-800 h-screen"></div>
    </section>
  </main>
</template>
