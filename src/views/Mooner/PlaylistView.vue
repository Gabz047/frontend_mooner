<script setup>
import { onMounted, ref, computed } from 'vue';
import { useArtistStore, useLoginStore, useSongStore, useFollowingStore, usePlaylistStore, useQueueStore, usePlayerStore, useUserStore } from '@/stores';
import { useRoute } from 'vue-router';
import DiscographyArtist from '@/components/artists/DiscographyArtist.vue';

import GlobalBlur from '@/components/global/GlobalBlur.vue';

import { MusicBoxCard, GlobalHeader, SideHeader, GlobalInfoHeader, AudioPlayer } from '@/components';

import { dataHeader } from '@/utils/header/header';
const route = useRoute()
const ArtistStore = useArtistStore()
const LoginStore = useLoginStore()
const SongStore = useSongStore()
const FollowingStore = useFollowingStore()
const UserIsFollowing = ref(null)
const playlistStore = usePlaylistStore()
const QueueStore = useQueueStore()
const playerStore = usePlayerStore()
const userStore = useUserStore()
onMounted(async () => {
  const artist = route.params.id
  await ArtistStore.getArtistsByName(artist)
  await SongStore.getSongs()
  await SongStore.getSongsByArtist(artist, LoginStore.access)
  UserIsFollowing.value = FollowingStore.followersByUser.find(artistic => artistic.artist.artistic_name === artist)
  
})

const verifyOwner = () => {
    const verified = playlistStore.selectedPlaylist.owners.filter((s) => s.email === userStore.myuser.email)
    return verified.length > 0 ? true : false
}

function setSong() {
  if (QueueStore.state.currentSong != {}){
    QueueStore.setCurrentSong(QueueStore.state.queue[0])
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

const verifyInPlaylist = computed(() => {
    const verified = playlistStore.selectedPlaylist.songs.filter((s) => s.id === QueueStore.currentSong.id)

    return verified.length > 0 ? true : false
})

const setPlaylistSongs = () => {
    if (verifyInPlaylist.value) {
    playlistStore.selectedPlaylist.songs.forEach(element => {
        QueueStore.addSongToQueue(element)
    });
    if (verifyInPlaylist.value && QueueStore.currentSong) {
        playerStore.usePlay()
    } else {
        setSong()
    }
}
}



onMounted(()=>{
    verifyOwner()
})
  </script>
<template>
    <SideHeader :data="dataHeader" />
    <main class="w-[80%] lg:w-full absolute right-0 mt-4 pt-[65px] pb-[60px]">
    <GlobalHeader />
  <div :style="{
     backgroundImage: `linear-gradient(270deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,1) 40%), url(${playlistStore.selectedPlaylist?.cover?.url})`}"
    style="background-repeat: no-repeat; background-size: contain; background-attachment: fixed; background-position: right; object-fit: cover;">
    <GlobalBlur :light_color="playlistStore.selectedPlaylist.background_light_color" :dark_color="playlistStore.selectedPlaylist.background_dark_color"/>
    <div class="z-20 relative ">
      <GlobalInfoHeader :isOwner="verifyOwner()" :title="playlistStore.selectedPlaylist.name" :UserIsFollowing="UserIsFollowing" :artist="artist"/>
      <div class="flex items-center w-full gap-10 p-5 min-h-64 ">
        <div class="min-w-[140px] flex items-center justify-center h-[200px] ">
        <span @click="setPlaylistSongs()" :class="`${verifyInPlaylist && playerStore.state.is_playing ? 'mdi mdi-pause' : 'mdi mdi-play-outline'}`" class="w-[120px] h-[120px] px-4 py-3 flex justify-center items-center bg-[rgba(90,45,186,0.7)] backdrop-blur-sm brightness-100 text-white rounded-full text-7xl z-[30]"
    ></span>
    </div>
        <div class="flex flex-col gap-4 w-full">
          <div class="flex justify-between items-center w-[77%]">
            <h1 class="text-xl text-white font-bold">Sugestões</h1>
            <p class="flex border-b-[1px] text-lg text-white font-medium ">+ Sugestões</p>
          </div>
          <div class="flex ">
            <MusicBoxCard isSuggestionDisplay="true":type="'Músicas'" class="mt-3" v-for="song in SongStore.songs" :data="song" />
          </div>
    </div>
  </div>
  <div class="p-5">
        <DiscographyArtist playlistView="true" :discography="playlistStore.selectedPlaylist.songs"/>
      </div>
  </div>
</div>
</main>
</template>