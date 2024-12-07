<script setup>
import { shallowRef } from 'vue';
const props = defineProps({
    data: {
        type: Object
    }
})

function hexToRgb(hex) {
    if (!hex) return 'rgb(0,0,0)'; 
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
}
const onHover = shallowRef(false)
</script>
<template>
    <div class="relative flex flex-col items-center justify-center px-2" @mouseenter="onHover = true" @mouseleave="onHover = false">
    <div  class="w-[150px] h-[185px] duration-200 rounded-[20px] flex flex-col items-center hover:brightness-[25%]" :class="onHover ? 'brightness-[25%]' : ''" :style="`background: linear-gradient(-34deg, ${hexToRgb(props.data?.background_light_color)} 0%, ${hexToRgb(props.data?.background_dark_color)} 100%);`">
        <div class="w-[141px] h-[137px] ">
            <img :src="props.data?.cover?.url" class="mt-[3px] w-[141px] h-[129px] rounded-[20px] object-cover" alt="">
        </div>
        <div class="h-40 mt-[5px] w-full flex justify-center items-center flex-col text-white">
            <p class="text-[14px] text-center font-semibold">{{props.data.title}}</p>
            <p v-for="artist in props.data.artists" class="text-[12px] font-light">{{ artist.artistic_name }}</p>
        </div>
        
    </div>
    <div class="flex w-full justify-between absolute top-0 p-2 z-[30] text-white text-xl" v-if="onHover">
        <span class="mdi mdi-plus-circle"></span>
        <span class="mdi mdi-dots-vertical"></span>
    </div>
    <span v-if="onHover" class="mdi mdi-play-outline absolute top-14 px-3 py-2 flex justify-center items-center bg-[rgba(255,255,255,0.5)] backdrop-blur-sm brightness-100 text-white rounded-full text-2xl z-[30]"></span>
    </div>
</template>
