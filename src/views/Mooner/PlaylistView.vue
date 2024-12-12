<script setup>
import { onMounted, ref, computed, reactive, onUnmounted, watch } from 'vue';
import { useArtistStore, useLoginStore, useSongStore, useFollowingStore, usePlaylistStore, useQueueStore, usePlayerStore, useUserStore, useMoonStore } from '@/stores';
import { useRoute } from 'vue-router';
import DiscographyArtist from '@/components/artists/DiscographyArtist.vue';

import GlobalBlur from '@/components/global/GlobalBlur.vue';

import { MusicBoxCard, GlobalHeader, SideHeader, GlobalInfoHeader, AudioPlayer, PlaylistEdition } from '@/components';

import { dataHeader } from '@/utils/header/header';
import { transformToId, updatePlaylists } from '@/utils/playlist/playlist';
import router from '@/router';
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
const moonStore = useMoonStore()
const token = LoginStore.access
const edit = ref(false)

onMounted(async () => {
  const artist = route.params.id
  await ArtistStore.getArtistsByName(artist)
  await SongStore.getSongs()
  await SongStore.getSongsByArtist(artist, LoginStore.access)
  UserIsFollowing.value = FollowingStore.followersByUser.find(artistic => artistic.artist.artistic_name === artist)
  verifyOwner()
})


const verifyOwner = () => {
    if (playlistStore.selectedPlaylist.owners) {
    const verified = playlistStore.selectedPlaylist.owners.filter((s) => s.email === userStore.myuser.email)
    return verified.length > 0 ? true : false
}
}

function setSong() {
  if (QueueStore.state.currentSong != {}){
    QueueStore.setCurrentSong(QueueStore.state.queue[0])
    setTimeout(()=>{playerStore.play()},500)
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
    if (QueueStore.currentSong != null) {
    if (playlistStore.selectedPlaylist.song) {
    const verified = playlistStore.selectedPlaylist.songs.filter((s) => s.id === QueueStore?.currentSong?.id)

    return verified.length > 0 ? true : false
    }
}
})


const firstPlay = ref(false)

const setPlaylistSongs = () => {
    if (!firstPlay.value) {
        QueueStore.state.queue  = playlistStore.selectedPlaylist.songs
        playlistStore.state.currentPlaylist = playlistStore.selectedPlaylist.name
    setSong()
    firstPlay.value = !firstPlay.value
    } else {   
        if (moonStore.state.reconnect) {
            moonStore.sendActions('use')
        } else {
            playerStore.usePlay()
        }
        
    
}
}

watch(QueueStore.state.currentSong, () => {
    if (!playlistStore.state.selectedPlaylist.includes(QueueStore.state.currentSong)) {
        playlistStore.state.currentPlaylist = null
    }
})


const updatePlaylist = (newSong) => {
    transformToId()
    playlistStore.newPlaylist.songs.push(newSong.id)
    playlistStore.newPlaylist.owners.push(userStore.myuser.email)
    console.log(playlistStore.newPlaylist.songs)
  const newPlaylist = reactive({
    id: playlistStore.selectedPlaylist.id,
    name: playlistStore.selectedPlaylist.name,
    owners: playlistStore.newPlaylist.owners,
    cover: playlistStore.selectedPlaylist.cover.attachment_key,
    songs: playlistStore.newPlaylist.songs,
  });

  playlistStore.updatePlaylist(newPlaylist, token);
  playlistStore.state.selectedPlaylist.songs.push(newSong)
};

const updateAllPlaylist = (playlist) => {
    transformToId()
    playlist.songs.forEach(element => {
        playlistStore.newPlaylist.songs.push(element.id)
    });
    playlistStore.newPlaylist.owners.push(userStore.myuser.email)
    playlistStore.newPlaylist.cover = playlist.cover.attachment_key

  const newPlaylist = reactive({
    id: playlistStore.selectedPlaylist.id,
    name: playlist.name,
    owners: playlistStore.newPlaylist.owners,
    cover: playlistStore.newPlaylist.cover,
    songs: playlistStore.newPlaylist.songs,
  });
  console.log(newPlaylist)
    playlistStore.updatePlaylist(newPlaylist, token);
    playlistStore.state.selectedPlaylist.songs.push(newSong)
   
    router.push('/')
}

  </script>
<template>
    <PlaylistEdition @addPlaylist="updatePlaylist" v-if="edit":data="playlistStore.selectedPlaylist" />
    <SideHeader :data="dataHeader" />
    <main class="w-[80%] lg:w-full absolute right-0 mt-4 pt-[65px] ">
    <GlobalHeader />
  <div :style="{
     backgroundImage: `linear-gradient(270deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,1) 40%), url(${playlistStore.selectedPlaylist?.cover?.url})`}"
    style="background-repeat: no-repeat; background-size: contain; background-attachment: fixed; background-position: right; object-fit: cover;" class="pb-[60px]">
    <GlobalBlur :light_color="playlistStore.selectedPlaylist.background_light_color" :dark_color="playlistStore.selectedPlaylist.background_dark_color"/>
    <div class="z-20 relative ">
      <GlobalInfoHeader @edit="edit = !edit" @save="edit = !edit" :isEdit="edit" :isOwner="verifyOwner()" :title="playlistStore?.selectedPlaylist?.name" :UserIsFollowing="UserIsFollowing" :artist="artist"/>
      <div class="flex items-center w-full gap-10 p-5 min-h-64 ">
        <div class="min-w-[140px] flex items-center justify-center h-[200px] ">
        <span @click="setPlaylistSongs()" :class="`${ playlistStore.state.currentPlaylist == playlistStore.selectedPlaylist.name && playerStore.state.is_playing ? 'mdi mdi-pause' : 'mdi mdi-play-outline'}`" class="w-[120px] h-[120px] px-4 py-3 flex justify-center items-center bg-[rgba(90,45,186,0.7)] backdrop-blur-sm brightness-100 text-white rounded-full text-7xl z-[30] hover:brightness-125 duration-200 active:scale-110"
    ></span>
    </div>
        <div class="flex flex-col gap-4 w-full">
          <div class="flex justify-between items-center w-full">
            <h1 class="text-xl text-white font-bold">Sugestões</h1>
            <p class="flex border-b-[1px] mr-5 text-lg text-white font-medium ">+ Sugestões</p>
          </div>
          <div class="flex ">
            <MusicBoxCard @addPlaylist="updatePlaylist" isSuggestionDisplay="true":type="'Músicas'" class="mt-3" v-for="song in SongStore.songs.slice(0, 6)" :data="song" />
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