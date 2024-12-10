<script setup>
import { SideHeader, GlobalHeader, MusicGlobalContainer, ContainerSliderSong, MusicBoxCard, CarroselContainer, GenreAndTypeFilterContainer, GenreBox, GenreContainer } from '@/components';
import { useAlbumStore, useArtistStore, useGenreStore, useLoginStore, usePlaylistStore, useSongStore } from '@/stores';
import { dataHeader } from '@/utils/header/header';
import { computed, onMounted, onUnmounted, ref } from 'vue';

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
    await genreStore.GetGenre()
    if (songStore.songsByGenre.length == 0) {
        getTypeData()
    }
   
    console.log(genreStore.genre)
})

// const genreStore.selectGetType.toLeft = ref(0)

</script>
<template>
    
    <SideHeader :data="dataHeader" />
    <main class="w-[80%] lg:w-full absolute right-0 mt-4 pt-[65px] pb-[55px]">
  
    <GlobalHeader />
    <p class="text-2xl text-white lg:lg" v-for="playlist in playlistStore.playlists">{{ playlist.name }}</p>

    <CarroselContainer :data="songStore.songs" />
    <GenreAndTypeFilterContainer :genre="genreStore.selectGetType.type" @action="getTypeData" :data="genreStore" />
    <GenreContainer :activeLeft="genreStore.selectGetType.toLeft > 0 ? true : false" :activeRight="genreStore.selectGetType.toLeft < 500 ? true : false" @left="genreStore.selectGetType.toLeft <= 0 ? '' : genreStore.selectGetType.toLeft -= 188" @right="genreStore.selectGetType.toLeft >= 500 ? '' : genreStore.selectGetType.toLeft += 188" v-if="genreStore.selectGetType.type == 'Músicas'" :artists="artistsStore.artists" width="w-[94%]" >
    <div :class="`flex w-full gap-4 duration-300`" :style="{marginLeft: `-${genreStore.returnToLeft}px`}">
    <GenreBox :active="genreStore.selectGetType.selectedGenre == genre.description" @action="getEmitData" v-for="genre in genreStore.genre" :data="genre" />
    </div>
    </GenreContainer>
    <MusicGlobalContainer width="w-11/12" justify_div="justify-start" >
        <MusicBoxCard :type="genreStore.selectGetType.type" class="mt-3" v-for="song in genreStore.selectGetType.type == 'Músicas' ? songStore.songsByGenre : genreStore.selectGetType.type == 'Playlists' ? playlistStore.playlists : genreStore.selectGetType.type == 'Álbuns' ? albumStore.albuns : artistsStore.artists" :data="song" />
    </MusicGlobalContainer>
    </main>
</template>