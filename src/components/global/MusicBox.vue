<script setup>
import {computed, ref} from 'vue'
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import SettingsGlobal from './SettingsGlobal.vue';
import AddPlaylist from './AddPlaylist.vue';
import { data, data_playlist, adjusteSize } from '@/utils/music/music';

const getClick = ref(false)
const settings= ref(false)
const playlist = ref(false)

const emits = defineEmits([
    'settings', 'playlist'
])

const props = defineProps({
    tittle: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    settings: {
        type: Boolean,
        required: false,
        default: false
    },
    playlist: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>
<template>
    <div class="relative w-80">
    <div class="flex items-center h-12 w-96 relative  music-box">
        <p class=" text-2xl w-1/12 flex font-semibold text-white text-center">{{ props.index }}</p>
        <div class="flex w-11/12 h-full justify-between">
            <div class="h-full w-3/12 duration-200 relative z-10 music-box-img">
                <img class="absolute top-3 left-[34px] w-6 h-6 z-20 brightness-200 music-play" @click="getClick = !getClick" :src="getClick ? play : pause">
                <img class="w-full h-full rounded-l-md music-img" src="../../assets/images/imagemdefundoregistro.png">
            </div>
            <div class="w-7/12 flex flex-col justify-center pl-3 overflow-hidden">
                <p class="font-semibold text-lg text-white">{{ adjusteSize(props.tittle, 18, 18) }}</p>
                <p class="text-base text-white">{{props.artist}}</p>
            </div>
            <div class="w-2/12 flex justify-end items-center music-play">
                <img  @click="emits('playlist')" src="../../assets/images/icons/add.svg" class="w-6 h-6">
                <img @click="emits('settings')" src="../../assets/images/icons/settingsdot.svg" class="w-4 h-4">
            </div>
        </div>
    </div>
    <SettingsGlobal :data="data" v-show="props.settings == true" />
    <AddPlaylist :data="data_playlist" v-show="props.playlist == true"  />
    </div>
    
   
</template>

<style scoped>
.music-play {
    visibility: hidden;
}
.music-box {
 & :hover .music-img {
    filter: brightness(50%);
}

 & :hover .music-play {
    visibility: visible;
 }
}
</style>