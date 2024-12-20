<script setup>
import { SearchGlobal, MusicBoxExtended } from '@/components';
import { useSongStore, useLoginStore, usePlaylistStore, useQueueStore,} from '@/stores/index'
import { computed, reactive, ref } from 'vue';


const props = defineProps({
    data: {
        type: Object
    }
})
const selectedSong = reactive({song: [], active: false})
const returnSelected = computed(()=>selectedSong)
const selected = ref(false)

const emits = defineEmits([
    'addToSearch',
    'addToPlaylist',
    'removeFromPlaylist'
])

const getAddToSearch = (song) => {
    emits('addToSearch', song)
}

const addToPlaylist = (song) => {
    console.log(selectedSong.song)
    
    if ((selectedSong.song.filter((s) => s == song.id)).length > 0) {
        const index = selected.song.findIndex((s) => s === song.id)
        selectedSong.song.splice(index, 1)
        emits('removeFromPlaylist', song)
    } else {
    emits('addToPlaylist', song)
    selectedSong.song.push(song.id)
    selectedSong.active = true
    // console.log(selectedSong)
}
}
</script>
<template>
    <div class="w-[400px] h-[350px]">
        <div class="w-full gap-4 flex items-center text-white">
            <p class="text-3xl font-semibold">Adicionar Músicas</p>
            <span class="mdi mdi-plus-circle text-2xl"></span>
        </div>
        <SearchGlobal class="mt-3" />
        <div class="w-full flex flex-col gap-2 max-h-[350px] overflow-auto mt-3">
            <div class="relative" v-for="music in props.data">
            <MusicBoxExtended :selected="returnSelected" @addToPlaylist="addToPlaylist" isOnAddSearch="true" :data="music" />
            </div>
        </div>
    </div>
</template>