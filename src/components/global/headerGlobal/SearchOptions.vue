<script setup>
import { onMounted, onUnmounted, shallowRef } from 'vue';
import MusicBoxExtended from '@/components/music/MusicBoxExtended.vue';
const open = shallowRef(false)

const props = defineProps({
    open: {
        type: Boolean
    },
    data: {
        type: Array
    }
})

const emits = defineEmits([
    'addToSearch'
])

const getAddToSearch = (song) => {
    emits('addToSearch', song)
}
</script>
<template>
   <div :class="props.open ? 'animation' : 'animationOut'" class="w-[285px] duration-200 backdrop-blur-sm rounded-2xl z-40 min-h-[222px] max-h-[400px] overflow-auto overflow-x-hidden absolute top-0  flex flex-col" style="background: linear-gradient(180deg, rgba(21,21,21,0.8) 0%, rgba(21,21,21,1) 80%);">
    <div class="mt-10 text-white w-full flex flex-col">
        <p class="p-3">Pesquisas Recentes</p>
    </div>
        <div class="w-full h-[290px] overflow-auto overflow-x-hidden flex flex-col gap-3">
        <MusicBoxExtended @addToSearch="getAddToSearch" v-for="music in props.data" :data="music" />
        </div>
   </div>
</template>

<style scoped>
.animation {
    animation: animation 0.5s 1 forwards
}

.animationOut {
    animation: animationOut 0.5s 1 forwards;
}

@keyframes animation {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes animationOut {
    from {
        opacity: 1;
    }
    to {
        
        opacity: 0;
    }
    }

    ::-webkit-scrollbar {
  width: 3px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 20px; /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: transparent; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}
</style>
