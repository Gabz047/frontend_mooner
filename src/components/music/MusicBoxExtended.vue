<script setup>
import { ref } from 'vue';

const props = defineProps({
    data: {
        type: Object
    },
    isOnSearch: {
        type: Boolean
    },
    isOnAddSearch: {
        type: Boolean
    },
    selected: {
        type: Object
    }
})
const emits = defineEmits([
    'addToSearch',
    'addToPlaylist'
])

const veriftySelected = () => {
    const songs = props.selected.song.filter((s) => s === props.data.id)
    return songs.length > 0 ? true : false
}

const hover = ref(false)
</script>
<template>
    <div @mouseenter="hover = true" @mouseleave="hover = false" @click="isOnSearch ? emits('addToSearch', props.data ) : isOnAddSearch ? emits('addToPlaylist', props.data) : ''" :class="props.isOnAddSearch ? `w-[100%] items-center duration-300 p-2 text-white relative h-[80px] flex justify-start ${props.selected.active && veriftySelected() ? 'bg-purple-900' : ''} ${props.selected.active && veriftySelected() ? ' hover:brightness-125 hover:bg-purple-900' : ''} hover:bg-[rgba(28,28,28,0.7)] rounded-lg` : `w-[90%] items-center px-2 duration-300 text-white h-[55px] ml-3 flex justify-start hover:bg-[rgba(28,28,28,0.6)] rounded-lg`">
        <div :class="props.isOnAddSearch ? `w-[85px] h-[70px]` : `w-[43px] h-[43px]`">
            <img class="w-full h-full rounded-xl object-cover" :src="props.data?.cover?.url" alt="">
        </div>
        <div class="h-full flex flex-col justify-center ml-2">
            <div class="flex w-full">
            <p :class="`text-${isOnAddSearch ? 'lg' : 'xsm'} font-light`">{{props.data.artists[0].artistic_name}} {{ props.data.artists.length > 1 ? '+' : '' }}</p>
            </div>
            <p :class="`text-${isOnAddSearch ? 'xl' : 'lg'} font-${isOnAddSearch ? 'semibold' : 'medium'}`">{{props.data.title}}</p>
        </div>
        <span v-show="hover || props.selected.active && veriftySelected()":class="`mdi ${props.selected.active && veriftySelected() ? 'mdi-checkbox-marked-circle-outline' : 'mdi-plus-circle'} absolute right-5 text-2xl`"></span>
    </div>
</template>