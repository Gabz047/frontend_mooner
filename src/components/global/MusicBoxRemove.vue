<script setup>
import {ref, onMounted} from 'vue'

import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import SettingsGlobal from './SettingsGlobal.vue';
import AddPlaylist from './AddPlaylist.vue';
import { adjusteSize, verify_active } from '@/utils/music/music';
import { artist } from '@/utils/artist/artist-profile';
import { usePlaylistStore, useQueueStore } from '@/stores';
import { useHistoryStore, useLoginStore } from '@/stores';
const HistoryStore = useHistoryStore()
const LoginStore = useLoginStore()


const QueueStore = useQueueStore()
const playlistStore = usePlaylistStore()

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
    },
    buttons: {
        type: Boolean,
        default: false
    },
    is_history: {
        type: Boolean,
        default: false
    },
    showInPlaylistAddComponent: {
        type: Boolean,
        default: false
    },
    remove: {
        type: Boolean,
        default: false
    }
})



const settings = ref(false)
const playlist = ref(false)
const clickToAdd = ref(false)

async function createsong(){
    if(!props.is_history){
        await HistoryStore.CreateSongHistory(LoginStore.user.email, LoginStore.access, props.music_data.id)
    }
}

const verifyInPlaylist = (song) => {
  if (playlistStore.selectedPlaylist.songs.filter(s => s.id == song.id).length > 0) {
    return false
  } else {
    return true
  }
}

</script>
<template>
    <div  v-if="props.showInPlaylistAddComponent ? verifyInPlaylist(props.music_data) : !showInPlaylistAddComponent " @click="props.buttons ? clickToAdd = !clickToAdd : ''" class="w-[330px] min-h-[45px] relative rounded-md duration-100 p-1 flex items-center justify-start">
    <div class="w-full h-full rounded-[5px] bg-[rgba(0,0,0,0.7)] absolute z-30 flex items-center justify-start">
       <div class="absolute ml-4 text-xl mdi mdi-trash-can-outline text-white"></div>
    </div>
    <div class="w-80 relative p-1" :class="is_search_history ? 'bg-neutral-800 rounded-md' : null" @click="createsong">
    <div class="flex items-center h-[48px] w-full relative gap-3 music-box z-20">
        <div class="w-1/12 flex justify-center" v-if="props.has_index">
            <p class=" text-2xl font-semibold text-white text-center">{{ props.has_index ? props.index : '' }}</p>
        </div>
        <div class="flex w-full h-full">
            <div class="h-full w-4/12 duration-200 relative z-10 music-box-img">
                <img class="absolute top-3 left-[25px] w-6 h-6 z-20 brightness-200 music-play" @click="QueueStore.setCurrentSong(props.music_data)" :src="(QueueStore.state.currentSong == props.music_data && is_playing) ? pause : play">
                <img class="h-full w-full rounded-l-md music-img" v-if="music_data.cover?.url" :src="music_data.cover.url ? music_data.cover.url : music_data.cover.file ? music_data.cover.file : null">
            </div>
            <div class="w-11/12 flex flex-col h-[48px] justify-center pl-3 overflow-hidden">
                <p :class="is_search_history ? 'font-semibold text-base text-white' : 'font-semibold text-lg text-white'">{{ adjusteSize(props.music_data.title, 14, 14) }}</p>
                <div class="flex gap-2">
                    <p :class="is_search_history ? 'text-base' : 'text-base text-white  flex'" v-for="artists in music_data.artists" :key="artist.id">{{artists.artistic_name}}</p>
                </div>    
            </div>
            <div class="w-2/12 flex justify-end items-center px-2 music-play" v-if="!is_search_history || props.buttons">
                <img  @click="playlist = !playlist, settings = false, verify_active = !verify_active" src="../../assets/images/icons/add.svg" class="w-6 h-6">
                <img @click="settings = !settings, playlist = false, verify_active = !verify_active" src="../../assets/images/icons/settingsdot.svg" class="w-4 h-4">
            </div>
        </div>
    </div>
    </div>
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
/* .hover-father:hover {
    .hover-son {

    }
} */
</style>