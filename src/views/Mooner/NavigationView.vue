<script setup>
import { SideHeader, GlobalHeader, MusicGlobalContainer, ContainerSliderSong, MusicBoxCard, CarroselContainer, GenreAndTypeFilterContainer, GenreBox, GenreContainer, player, NavigationContainers } from '@/components';
import { useAlbumStore, useArtistStore, useGenreStore, useLoginStore, usePlaylistStore, useSongStore } from '@/stores';
import { dataHeader } from '@/utils/header/header';
import { onMounted,ref } from 'vue';
import { search, songs } from '@/utils/music/music';

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
    await songStore.getSongs()
    songs.value = songStore.songs
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

const songSections = ref([
    {title: 'Músicas', content: [], position: 0},
    {title: 'Playlists', content: [], position: 0},
    {title: 'Artistas', content: [], position: 0},
    {title: 'Álbuns', content: [], position: 0}
])

onMounted(async ()=>{
    await genreStore.GetGenre()
    await songStore.getSongs()
    await albumStore.getAlbuns()
    await playlistStore.getPlaylist()
    await artistsStore.getArtists()
    songSections.value[0].content = songStore.songs
    songSections.value[1].content = playlistStore.playlists
    songSections.value[2].content = artistsStore.artists
    songSections.value[3].content = albumStore.albuns
   
})



// const genreStore.selectGetType.toLeft = ref(0)

</script>
<template>
    
    <SideHeader :data="dataHeader" />
    <main class="w-[80%] lg:w-full absolute right-0 mt-4 pt-[65px] pb-[60px]">
  
    <GlobalHeader />
    <GenreContainer class="mt-12" top="-17px" Height="h-[60px]" :activeLeft="genreStore.selectGetType.toLeft > 0 ? true : false" :activeRight="genreStore.selectGetType.toLeft < 500 ? true : false" @left="genreStore.selectGetType.toLeft <= 0 ? '' : genreStore.selectGetType.toLeft -= 188" @right="genreStore.selectGetType.toLeft >= 500 ? '' : genreStore.selectGetType.toLeft += 188" v-if="genreStore.selectGetType.type == 'Músicas'" :artists="artistsStore.artists" width="w-[94%]" >
    <div :class="`flex w-full gap-4 duration-300`" :style="{marginLeft: `-${genreStore.returnToLeft}px`}">
    <GenreBox :active="genreStore.selectGetType.selectedGenre == genre.description" @action="getEmitData" v-for="genre in genreStore.genre" :data="genre" />
    </div>
    </GenreContainer>
    <div class="w-full flex flex-col gap-8">
    <MusicGlobalContainer v-if="search != '' && search != 'Pesquise por uma música'" width="w-11/12" justify_div="justify-start" >
        <MusicBoxCard :type="genreStore.selectGetType.type" class="mt-3" v-for="song in songStore.songsByTitle" :data="song" />
    </MusicGlobalContainer>
    <NavigationContainers v-else class="mt-8" v-for="item in songSections" :title="item.title" Height="h-[200px]" :activeleft="item.position > 0 ? true : false" :activeRight="item.position < 146*item.content.length ? true : false" @left="item.position <= 0 ? '' : item.position -= 188" @right="item.position >= 146*item.content.length ? '' : item.position += 188"  >
        <div :class="`flex w-full gap-4 duration-300`" :style="{marginLeft: `-${item.position}px`}">
        <MusicBoxCard :type="item.title" class="mt-3" v-for="song in item.content" :data="song" />
        </div>
    </NavigationContainers>
    </div>
    </main>
    <player />
</template>