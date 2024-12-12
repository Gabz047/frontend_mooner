
<script setup>
import { ref } from 'vue';
import { useQueueStore } from '@/stores';
import { adjusteSize } from '@/utils/music/music';
import QueueSongs from './QueueSongs.vue';

const queueStore = useQueueStore()

const open = ref(false)

const remove = (id) => {
    queueStore.removeFromQueue(id)
}
</script>
<template>
    <div v-if="queueStore.state.queue.length > 0" :class=" !open ? 'absolute z-[999] right-0 bottom-[70px] flex gap-4 rounded-lg bg-[rgba(14,14,14,0.95)] queue-container flex-col justify-end' : 'absolute z-[999] right-0 bottom-[70px] flex gap-4 rounded-lg bg-[rgba(14,14,14,1)] queue-container-open flex-col justify-end'">
        <div  @click="open = !open" class=" text-[#AA5AF5] gap-2 openQueue">
            <p >{{open ? 'Fechar Fila' : 'Abrir Fila'}}</p>
            <span :class=" !open ? 'mdi mdi-arrow-up-circle-outline' : 'mdi mdi-arrow-down-circle-outline'"></span>
        </div>
        <div :class="!open ? 'flex gap-4 justify-center text-nowrap' : 'hidden'">
        <p>A seguir...</p>
        <p class="text-white text-nowrap ">{{ adjusteSize(queueStore.state.queue[0].title, 16, 16) }}</p>
        </div>
        <QueueSongs @eraseQueue="queueStore.state.queue = []" @action="remove" v-if="open" :data_next="queueStore.state.queue" :data="queueStore.state.currentSong" />
    </div>
</template>
<style scooped>

.openQueue {
    visibility: hidden;
    width: 100%;
    padding: 5px;
    cursor: pointer;
    opacity: 0;
    transition: 0.5s;
    display: flex;
    gap: 2;
    justify-content: center;
    position: absolute;
    top: 0;
}
.queue-container {
    padding: 8px;
    transition: 0.5s;
    height: 40px;
    min-width: 240px;
    &:hover {
        height: 80px;

        .openQueue {
            visibility: visible;
            opacity: 1;
            
        }
    }
}

.queue-container-open {
    padding: 8px;
    transition: 0.5s;
    height: 400px;
    width: 280px;

    .openQueue {
            visibility: visible;
            opacity: 1;
            
        }
}
</style>