<script setup>
import {ref} from 'vue'
import MusicBox from '@/components/global/MusicBox.vue';
import { data_music } from '@/utils/music/music';
</script>

<template>
    <div class="bg-[#121212] p-56">
 <MusicBox v-for="item, index in data_music" :key="index" :music_data="item" :index="index" @createPlaylist="item.has_playlist = !item.has_playlist" :has_playlist="item.has_playlist" />
</div>
</template>