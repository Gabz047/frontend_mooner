<script setup>
import {ref, computed} from 'vue'
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import SettingsGlobal from './SettingsGlobal.vue';
import AddPlaylist from './AddPlaylist.vue';
import { data_playlist, adjusteSize, verify_active } from '@/utils/music/music';

const getClick = ref(false)

const emits = defineEmits([
    'createPlaylist'
])

const props = defineProps({
    music_data: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    has_playlist: {
        type: Boolean,
        required: true
    },
    has_index: {
        type: Boolean,
        default: false
    },
    buttons: {
        type: Boolean,
        default: true
    }
})

const settings = ref(false)
const playlist = ref(false)
const clickToAdd = ref(false)

</script>
<template>
    <div @click="!buttons ? clickToAdd = !clickToAdd : ''" class="w-80 relative rounded-md" :class="clickToAdd ? 'bg-[#6340AE]' : 'bg-none', !buttons ? 'p-1' : ''" >
        <div :class=" !buttons ? clickToAdd ? 'absolute w-full h-full rounded-md bg-[#6340AE] opacity-[0.95] top-0 left-0 z-30 flex justify-center items-center' : '' : ''">
           <img v-if="!buttons && clickToAdd" class="size-8 z-50" src="@/assets/images/icons/verified.svg">
           <p v-if="!buttons && clickToAdd">Adicionado</p>
        </div>
    <div class="flex items-center h-10 w-72 relative music-box z-20">
        <div class="w-1/12 flex justify-center">
        <p class=" text-2xl font-semibold text-white text-center">{{ props.has_index ? props.index : '' }}</p>
        </div>
        <div class="flex w-11/12 h-full" :class="props.buttons ? 'justify-between' : 'justify-normal'">
            <div class="h-full w-3/12 duration-200 relative z-10 music-box-img">
                <img class="absolute top-2 left-[22px] w-6 h-6 z-20 brightness-200 music-play" @click="getClick = !getClick" :src="getClick ? play : pause">
                <img class="w-full h-full rounded-l-md music-img" :src="music_data.cover.url">
            </div>
            <div class="w-7/12 flex flex-col justify-center pl-3 overflow-hidden">
                <p class="font-semibold text-lg text-white">{{ adjusteSize(props.music_data.title, 14, 14) }}</p>
                <p class="text-base text-white">{{music_data.artist}}</p>
            </div>
            <div v-if="props.buttons" class="w-2/12 flex justify-end items-center music-play">
                <img  @click="playlist = !playlist, settings = false, verify_active = !verify_active" src="../../assets/images/icons/add.svg" class="w-6 h-6">
                <img @click="settings = !settings, playlist = false, verify_active = !verify_active" src="../../assets/images/icons/settingsdot.svg" class="w-4 h-4">
            </div>
        </div>
    </div>
    <SettingsGlobal :is_on="settings" />
    <AddPlaylist :is_on="playlist" @createPlaylist="emits('createPlaylist')" :has_playlist="props.has_playlist" :data="data_playlist" /> 
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