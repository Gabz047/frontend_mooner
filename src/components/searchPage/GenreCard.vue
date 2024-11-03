<script setup>
import router from '@/router';
import { genres } from '@/utils/genre/genres';

function gotoPageGenre(title){
    router.push(`/${title}`)
}
</script>
<template>
    <div v-for="genre, index in genres" :key="index" @click="gotoPageGenre(genre.title)"  class="bg-[rgba(255,255,255,0.40)]  flex justify-center items-center h-52 w-80 relative transition-all hover:scale-105 ">
        <img :src="genre.img" class="h-full w-full absolute opacity-30 transition-opacity hover:opacity-100 " >
        <h1 class="text-2xl font-bold text-white z-10">{{genre.title}}</h1>
    </div>
</template>