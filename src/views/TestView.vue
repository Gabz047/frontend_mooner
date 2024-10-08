<script setup>
import {ref} from 'vue'
import MusicBox from '@/components/global/MusicBox.vue';
import SettingsGlobal from '@/components/global/SettingsGlobal.vue';
import { data_music } from '@/utils/music/music';

const settings = ref(false)
const playlist = ref(false)
</script>

<template>
    <div class="bg-[#121212] p-56">
 <MusicBox @playlist="playlist = !playlist, settings = false" @settings="settings = !settings, playlist = false" v-for="item, index in data_music" :key="index" :tittle="item.tittle" :artist="item.artist" :index="index" :playlist="playlist" :settings="settings" />
</div>
</template>