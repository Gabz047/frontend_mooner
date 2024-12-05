<script setup>
import router from '@/router';
import { genres } from '@/utils/genre/genres';
import { useSongStore } from '@/stores';
const SongStore = useSongStore()

function gotoPageGenre(title){
    router.push(`/${title}`)
}

function filterSongsByGenre(genre){
    const songs = SongStore.songs.filter(song => song.genre.description === genre)
    return songs.length
}

</script>
<template>
    <div v-for="genre, index in genres" :key="index" @click="gotoPageGenre(genre.title)"  class="bg-[rgba(0,0,0, 0.7)] select-none cursor-pointer rounded-xl flex justify-center items-center h-52 w-80 relative transition-all hover:scale-105 ">
        <img :src="genre.img" class="rounded-xl h-full w-full absolute opacity-30 transition-opacity hover:opacity-100 " >
        <div class="flex justify-center items-center flex-col gap-2">
            <h1 class="text-4xl font-bold text-white z-10">{{genre.title}}</h1>
            <p class="text-white z-10">{{ filterSongsByGenre(genre.title) }} músicas</p>
        </div>
    </div>
</template>