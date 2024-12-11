<script setup>
import { SideHeader, GlobalHeader, MusicGlobalContainer, ContainerSliderSong, MusicBoxCard, CarroselContainer, GenreAndTypeFilterContainer, GenreBox, GenreContainer, player } from '@/components';
import { useAlbumStore, useArtistStore, useGenreStore, useLoginStore, usePlaylistStore, useSongStore } from '@/stores';
import { dataHeader } from '@/utils/header/header';
import { onMounted} from 'vue';

const songStore = useSongStore()
const genreStore = useGenreStore()
const playlistStore = usePlaylistStore()
const albumStore = useAlbumStore()
const artistsStore = useArtistStore()
const loginStore = useLoginStore()

const getEmitData = (data) => {
    songStore.state.songsByGenre = []
    if (genreStore.selectGetType.type == 'Músicas') {
    if (data === 'Todos') {
       
        songStore.GetSongByGenre('', '')
    } else {
        songStore.GetSongByGenre(data, '')
    }
    genreStore.selectGetType.selectedGenre = data
}
}


const getTypeData = async (data) => {
    if (data == 'Músicas') {
        artistsStore.state.artists = []
        albumStore.state.albuns = []
        playlistStore.state.playlists = []
        await songStore.GetSongByGenre('', '')
        genreStore.selectGetType.type = data
    }
    else if (data == 'Playlists') {
        artistsStore.state.artists = []
        albumStore.state.albuns = []
        songStore.state.songsByGenre = []
        songStore.state.songs = []
       await playlistStore.getPlaylist(loginStore.access, '')
        genreStore.selectGetType.type = data
        
    } else if (data == 'Álbuns') {
        artistsStore.state.artists = []
        playlistStore.state.playlists = []
        songStore.state.songsByGenre = []
        songStore.state.songs = []
       await albumStore.getAlbuns()
        genreStore.selectGetType.type = data
    } else {
        albumStore.state.albuns = []
        playlistStore.state.playlists = []
        songStore.state.songsByGenre = []
        songStore.state.songs = []
       await artistsStore.getArtists()
        genreStore.selectGetType.type = data
    }
//    window.location.reload()
}

onMounted(async ()=>{
    songStore.getSongs()
})

// const genreStore.selectGetType.toLeft = ref(0)

</script>
<template>
    
    <SideHeader :data="dataHeader" />
    <main class="w-[80%] lg:w-full absolute right-0 mt-4 pt-[65px] pb-[60px]">
  
    <GlobalHeader />
    <p class="text-2xl text-white lg:lg" v-for="playlist in playlistStore.playlists">{{ playlist.name }}</p>

    <CarroselContainer :data="songStore.songs" />
    </main>
</template>