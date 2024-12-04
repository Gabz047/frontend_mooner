<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { usePlayerStore } from '@/stores/mooner/player';
import { useQueueStore } from '@/stores';

const queueStore = useQueueStore();
const playerStore = usePlayerStore();
const songPlayer = ref(null)
// const songPlayerVisual = ref(null)

onMounted(() => {
    nextTick(() => {
        playerStore.state.songPlayer = songPlayer.value;
        // playerStore.state.songPlayerVisual = songPlayer.value
    });
})

</script>

<template>
    <audio ref="songPlayer" class="" :src="queueStore.state?.currentSong?.player?.url || ''"></audio>
    <audio ref="songPlayerVisual" class="" :src="queueStore.state?.currentSong?.player?.url || ''"></audio>
</template>