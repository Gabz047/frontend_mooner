<script setup>
import { ref } from 'vue';
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import { useQueueStore } from '@/stores';

const QueueStore = useQueueStore()
const songPlayer = ref(null)

</script>

<template>
    <div class="flex w-[98%] ml-[1%] mr-[1%] fixed bottom-0 h-14 justify-center items-center bg-yellow-500 z-20 rounded-xl">
        <div class="relative">
            <audio ref="songPlayer" class="" :src="QueueStore.state.currentSong.player.url"></audio>
            <img class="h-10 w-10 brightness-50 rounded-lg bg-slate-600 border-none" :src="QueueStore.state.currentSong.cover.url" alt="">
            <img class="absolute top-2 left-2 w-6 h-6 z-30 brightness-200" @click="songPlayer.play()" :src="(QueueStore.state.currentSong) ? pause : play">
        </div>
    </div>
</template>