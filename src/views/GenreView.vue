<script setup>
import { useLoginStore, useSongStore } from '@/stores';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import MusicBox from '@/components/global/MusicBox.vue';
const route = useRoute()
const SongStore = useSongStore()
const LoginStore = useLoginStore()

onMounted(async () =>{
    const genre = route.params.genre
    await SongStore.GetSongByGenre(genre, LoginStore.access)
})
</script>
<template>
    <h1 class="text-white text-2xl">{{route.params.genre}}</h1>
    <MusicGlobalContainer class="mt-3">
        <MusicBox v-for="item, index in SongStore.songsByGenre" :key="index" :music_data="item"/>
    </MusicGlobalContainer>
</template>