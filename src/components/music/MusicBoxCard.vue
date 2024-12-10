<script setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';
import { adjusteSize } from '@/utils/music/music';
import { useQueueStore, useMoonStore, usePlaylistStore, useSongStore, usePlayerStore } from '@/stores';
import { SettingsGlobal, AddPlaylist, AudioPlayer } from '@/components';

const QueueStore = useQueueStore()
const playlistStore = usePlaylistStore()
const moonStore = useMoonStore()
const playerStore = usePlayerStore()

const songStore = useSongStore()
const props = defineProps({
    data: {
        type: Object
    },
    type: {
        type: String
    }
})

const objData = reactive({
    name: '',
    autor: '',
    image: null,
    feat: false,
    light: '',
    dark: ''
})

const getData = () => {
    if (props.type == 'Músicas') {
        objData.name = props?.data.title
        objData.autor = props?.data.artists[0].artistic_name
        objData.image = props?.data.cover.url
        objData.light = props?.data.background_light_color
        objData.dark = props?.data.background_dark_color
        props.data.artists.length > 0 ? objData.feat = true : objData.feat = false
    } else if (props.type == 'Álbuns') {
        objData.name = props?.data.name
        objData.autor = props?.data.autor.artistic_name
        objData.image = props?.data.cover.url
        objData.light = props?.data.background_light_color
        objData.dark = props?.data.background_dark_color
        props.data.owners > 0 ? objData.feat = true : objData.feat = false
    } else if (props.type == 'Playlists') {
        objData.name = props?.data.name
        objData.autor = props?.data.owners[0].name
        objData.image = props?.data.cover.url
        objData.light = props?.data.background_light_color
        objData.dark = props?.data.background_dark_color

    } else {
        objData.name = props?.data.artistic_name
        objData.autor = ''
        objData.image = props?.data.user.perfil.url
        objData.light = props?.data.user.background_light_color
        objData.dark = props?.data.user.background_dark_color
        
    }
}

onMounted(()=>{
    // console.log(props.data.artists[0].artistic_name, props.data)

    getData()
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

const clickToAdd = ref(false)

async function createsong() {
  if (!props.is_history) {
    await HistoryStore.CreateSongHistory(
      LoginStore.user.email,
      LoginStore.access,
      props.data.id
    )
  }
}

function setSong() {
  if (QueueStore.state.currentSong != props.data){
    QueueStore.setCurrentSong(props.data)
    playerStore.play()
    if (moonStore.state.reconnect) {
      moonStore.sendActions('song')
    }
  }
  else {
    if (moonStore.state.reconnect) moonStore.sendActions('use');
    else playerStore.usePlay();
  }
}

const verifyInPlaylist = (song) => {
  if (playlistStore.selectedPlaylist.songs.filter(s => s.id == song.id).length > 0) {
    return false
  } else {
    return true
  }
}


const onHover = shallowRef(false)
</script>
<template>
    <div class="relative">
    <div class="relative flex flex-col items-center justify-center px-2" @mouseenter="onHover = true" @mouseleave="onHover = false">
    <div  class="w-[155px] h-[185px] duration-200 rounded-[20px] flex flex-col items-center hover:brightness-[25%]" :class="onHover ? 'brightness-[25%]' : ''" :style="`background: linear-gradient(-34deg, ${hexToRgb(objData.light)} 0%, ${hexToRgb(objData.dark)} 100%);`">
        <div class="w-[146px] h-[137px] ">
            <img :src="objData.image" class="mt-[3px] w-[146px] h-[129px] rounded-[20px] object-cover" alt="">
        </div>
        <div class="h-40 mt-[5px] w-full flex justify-center items-center flex-col text-white">
            <p class="text-[14px] text-center font-semibold text-nowrap">{{adjusteSize(objData.name, 16, 16) }}</p>
            <p class="text-[12px] font-light">{{ objData.autor }} {{ objData.feat ? '+' : '' }}</p>
        </div>
        
    </div>
    <div class="flex w-full justify-between absolute top-0 p-2 z-[30] text-white text-xl" v-if="onHover && props.type == 'Músicas'">
        <span @click="songStore.activated({id: props.data.id, name: 'playlist'}), (settings = false), (verify_active = !verify_active)" class="mdi mdi-plus-circle"></span>
        <span @click="songStore.activated({id: props.data.id, name: 'settings'}), (playlist = false), (verify_active = !verify_active)" class="mdi mdi-dots-vertical"></span>
    </div>
    <AudioPlayer />
    <span @click="setSong" v-if="onHover && props.type == 'Músicas'" :class="`${QueueStore.state.currentSong == props.data && playerStore.state.is_playing ? 'mdi mdi-pause' : 'mdi mdi-play-outline'} absolute top-14 px-3 py-2 flex justify-center items-center bg-[rgba(255,255,255,0.5)] backdrop-blur-sm brightness-100 text-white rounded-full text-2xl z-[30]`"></span>
    </div>
    <SettingsGlobal :artist="props.data.artists[0]" :artist_name="props.data.artists[0].artistic_name"
      :is_on="songStore.simpleState.item_settings == props.data.id"
      @addQueue="QueueStore.addSongToQueue(props.data), songStore.simpleState.item_settings = null"
    />
    <AddPlaylist
      :is_on="songStore.simpleState.item_playlist == props.data.id"
      @createPlaylist="emits('createPlaylist')"
      :has_playlist="props.has_playlist"
      :music_data="props.data"
    />
</div>
</template>
