<script setup>
import {ref, computed} from 'vue'
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import SettingsGlobal from './SettingsGlobal.vue';
import AddPlaylist from './AddPlaylist.vue';
import { data_playlist, adjusteSize, verify_active } from '@/utils/music/music';
import { artist } from '@/utils/artist/artist-profile';

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
    is_search_history:{
        type: Boolean,
        required: false
    }
})

const settings = ref(false)
const playlist = ref(false)

</script>
<template>
<div class="w-64 relative">
    <div :class="is_search_history ? 'flex items-center w-72  h-10 relative music-box' : 'flex items-center w-72 h-10 relative music-box'">
        <div class="w-1/12 flex justify-center" v-if="props.has_index">
            <p class=" text-2xl font-semibold text-white text-center">{{ props.has_index ? props.index : '' }}</p>
        </div>
        <div :class="is_search_history ? 'flex w-11/12 h-full' : 'flex w-11/12 h-full justify-between'">
            <div class="h-full w-3/12 duration-200 relative z-10 music-box-img">
                <img class="absolute top-2 left-[22px] w-6 h-6 z-20 brightness-200 music-play" @click="getClick = !getClick" :src="getClick ? play : pause">
                <img class="w-full h-full rounded-l-md music-img" src="../../assets/images/imagemdefundoregistro.png">
            </div>
            <div class="w-7/12 flex flex-col justify-center pl-3 overflow-hidden">
                <p :class="is_search_history ? 'font-semibold text-base text-white' : 'font-semibold text-lg text-white'">{{ adjusteSize(props.music_data.title, 14, 14) }}</p>
                <div class="flex gap-2">
                    <p :class="is_search_history ? 'text-' : 'text-base[10px] text-white  flex'" v-for="artists in music_data.artists" :key="artist.id">{{artists.artistic_name}}</p>
                </div>    
            </div>
            <div class="w-2/12 flex justify-end items-center music-play" v-if="!is_search_history">
                <img  @click="playlist = !playlist, settings = false, verify_active = !verify_active" src="../../assets/images/icons/add.svg" class="w-6 h-6">
                <img @click="settings = !settings, playlist = false, verify_active = !verify_active" src="../../assets/images/icons/settingsdot.svg" class="w-4 h-4">
            </div>
        </div>
    </div>
    <SettingsGlobal v-if="!is_search_history" :is_on="settings" />
    <AddPlaylist v-if="!is_search_history" :is_on="playlist" @createPlaylist="emits('createPlaylist')" :has_playlist="props.has_playlist" :data="data_playlist" /> 
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