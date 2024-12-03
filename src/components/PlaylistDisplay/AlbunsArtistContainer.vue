<script setup>
import { useAlbumStore } from '@/stores';
import { adjusteSize } from '@/utils/music/music';
import { onMounted } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        defaut: null
    }
})

onMounted(()=>{
    console.log('gelo')
    console.log(useAlbumStore().albunsByAutor)
})
</script>
<template>
    <section class="w-full h-full mt-10 rounded-md p-5 bg-[#242424] flex flex-col items-center">
        <p class="text-white text-2xl">Albúns</p>

        <div v-for="album in props.data" class="w-full h-64 lg:h-full flex flex-col gap-5 items-center justify-center mt-5">
            <div class="w-[100%] h-56 shadow-2xl">
                <img class="w-full h-full rounded-md" :src="album.cover.url" alt="">
            </div>
            <div class="h-1/5 flex w-full flex-col items-center text-white">
                <p class="text-2xl leading-5 font-medium">{{ adjusteSize(album.name, 30, 30) }}</p>
                <p class="text-xl leading-3 font-medium">.</p>
                <p class=" text-sm leading-8 font-medium">{{ album.songs.length }} Músicas</p>
            </div>
        </div>
    </section>    
</template>