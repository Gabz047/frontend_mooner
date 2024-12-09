<script setup>
import { onMounted, ref } from 'vue';
import { useAlbumStore, useArtistStore, useLoginStore, useSongStore, useFollowingStore } from '@/stores';
import { useRoute } from 'vue-router';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import MusicBox from '@/components/global/MusicBox.vue';

const route = useRoute()
const ArtistStore = useArtistStore()
const LoginStore = useLoginStore()
const SongStore = useSongStore()
const AlbumStore = useAlbumStore()
const FollowingStore = useFollowingStore()
const artist = route.params.id
const UserIsFollowing = ref(null)

async function FolloworUnfollow() {
    const index = FollowingStore.followersByUser.findIndex(artistic => artistic.artist.artistic_name === artist)
    if(UserIsFollowing.value){
      await FollowingStore.deleteFollow(UserIsFollowing.value.id, index, LoginStore.access)
      location.reload()
    }
    else{
      await FollowingStore.createFollow({user: LoginStore.user.email, artist: ArtistStore.artistsByName[0]?.user?.email }, LoginStore.access)
      location.reload()
    }   
} 

onMounted(async () => {
  await ArtistStore.getArtistsByName(artist, LoginStore.access)
  await SongStore.getSongsByArtist(artist, LoginStore.access)
  await AlbumStore.getAlbunsByAutor(ArtistStore.artistsByName[0]?.user?.email, LoginStore.access)
  UserIsFollowing.value = FollowingStore.followersByUser.find(artistic => artistic.artist.artistic_name === artist)
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

</script>
<template>
  <div
    :style="{
      backgroundImage: `linear-gradient(315deg, rgba(0,0,0, 0.65) 10%, rgba(0,0,0,1) 65%), url(${ArtistStore.artistsByName[0].user.background_image.url})`}"
    style="background-repeat: no-repeat; background-size: cover; background-attachment: fixed;">
    <div class=" fixed flex w-10/12 justify-center itemns-center z-0 bottom-0">
      <div class="blur-[400px] shadow-2xl absolute right-0 w-7/12 h-96 z-0 border-2 bottom-[-330px] rounded-[50%]"  :style="`background-color: ${hexToRgb(ArtistStore.artistsByName[0].user.background_light_color)}`"></div>
      <div class="blur-[400px] shadow-2xl absolute left-0 w-7/12 h-96 z-0 border-2 bottom-[-290px] rounded-[50%]"   :style="`background-color: ${hexToRgb(ArtistStore.artistsByName[0].user.background_dark_color)}`"></div>
    </div>
    <div class="z-20 relative">
      <!-- componente 1 -->
      <div class="w-full flex justify-between p-5 items-center">
        <h1 class="text-white text-6xl font-semibold ms-3">{{ ArtistStore.artistsByName[0]?.artistic_name }}</h1>
        <ButtonGlobal :title="UserIsFollowing ? 'Deixar de Seguir' : 'Seguir' " border="1px solid white" width="150px" border_radius="20px" color="white"
          padding="5px" class="me-32" @click="FolloworUnfollow" />
      </div>
      <!-- componente 2 -->
      <div class="flex items-center w-full gap-20 p-5">
        <img :src="ArtistStore.artistsByName[0]?.user?.perfil?.url" width="200" class="rounded-full object-cover h-[200px] mt-8">
        <div class="flex flex-col gap-4 mt-5 w-full">
          <div class="flex justify-between items-center w-full">
            <h1 class="text-xl text-white font-bold">Albuns</h1>
            <div class="flex text-white me-20">
              <ButtonGlobal title="<" class="text-xl" />
              <ButtonGlobal title=">" class="text-xl" />
            </div>
          </div>
          <div v-if="AlbumStore.albunsByAutor.length > 0">
            <div v-for="albuns in AlbumStore.albunsByAutor" :style="{ backgroundColor: albuns.background_dark_color }"
              class="rounded-3xl w-44 p-1 h-52 flex flex-col justify-between items-center text-white transition-transform hover:scale-105"
              :key="albuns.id">
              <img :src="albuns.cover.url" class="h-36 w-52 rounded-3xl">
              <div class="flex flex-col items-center">
                <h1 class="text-xl ">{{ albuns.name }}</h1>
                <p class="font-extralight">{{ albuns.autor.artistic_name }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <h1 class="text-white ">O artista ainda não possui album</h1>
          </div>
        </div>
      </div>
      <!-- componente 3 -->
      <div class="p-5">
        <div class="flex justify-between items-center p-5 text-white">
          <h1 class="text-3xl font-bold">Discografia</h1>
          <p class="text-xl font-semibold">Vizualizações</p>
          <p class="text-xl font-semibold">Lançamento</p>
        </div>
        <div v-for="song in SongStore.songsByArtist" class="flex justify-between p-2 ms-4 me-4" :key="song.id">
          <div class="flex gap-3">
            <MusicBox :music_data="song" />
          </div>
          <div class="me-32">
            <p class="text-white">{{ song.reproductions }}</p>
          </div>
          <p class="text-white me-3">{{ song.date_realized }}</p>
        </div>
      </div>
      <!-- componente 4 -->
      <div class="w-full flex p-5 justify-center items-center">
        <div class="text-white flex flex-col gap-20 w-full   p-5 rounded-2xl"
          :style="{ backgroundImage: `linear-gradient(315deg, rgba(0,0,0, 0.6) 10%, rgba(0,0,0,1) 90%), url(${ArtistStore.artistsByName[0].user?.perfil?.url})` }"
          style="background-repeat: no-repeat; background-size: cover; background-attachment: fixed;">
          <h1 class="text-3xl font-bold">Biografia</h1>
          <p class="font-bold">{{ ArtistStore.artistsByName[0]?.user?.description ?
            ArtistStore.artistsByName[0]?.user?.description : 'Este Artista não possui Biografia' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>