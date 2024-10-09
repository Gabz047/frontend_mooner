<script setup>
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import MusicBox from '@/components/global/MusicBox.vue';
import { data_music } from '@/utils/music/music';
</script>
<template>
<main class="w-dvw h-dvh bg-black">
    <MusicGlobalContainer >
        <MusicBox v-for="item, index in data_music" :key="index" :music_data="item" :index="index" @createPlaylist="item.has_playlist = !item.has_playlist" :has_playlist="item.has_playlist" />
    </MusicGlobalContainer>
</main>
</template>
