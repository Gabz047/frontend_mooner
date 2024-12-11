<script setup>
import { onMounted, ref } from 'vue';
import { useAlbumStore, useArtistStore, useLoginStore, useSongStore, useFollowingStore, useCommunityStore } from '@/stores';
import { useRoute } from 'vue-router';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import FollowArtist from '@/components/artists/FollowArtist.vue';
import DiscographyArtist from '@/components/artists/DiscographyArtist.vue';
import BiographyArtist from '@/components/artists/BiographyArtist.vue';
import GlobalBlur from '@/components/global/GlobalBlur.vue';
import CommunityArtist from '@/components/artists/CommunityArtist.vue';
import router from '@/router';

const route = useRoute()
const ArtistStore = useArtistStore()
const LoginStore = useLoginStore()
const SongStore = useSongStore()
const AlbumStore = useAlbumStore()
const FollowingStore = useFollowingStore()
const UserIsFollowing = ref(null)
const CommunityStore = useCommunityStore()

async function enterCommunity(id){
  const response = await CommunityStore.CreateCommunityUser({user: LoginStore.user.email, community: id}, LoginStore.access)
  router.push(`/community/${response.community}/`)
} 

onMounted(async () => {
  const artist = route.params.id
  await ArtistStore.getArtistsByName(artist, LoginStore.access)
  await SongStore.getSongsByArtist(artist, LoginStore.access)
  await AlbumStore.getAlbunsByAutor(ArtistStore.artistsByName[0]?.user?.email, LoginStore.access)
  await CommunityStore.getCommunitysByAutor(artist, LoginStore.access)
  UserIsFollowing.value = FollowingStore.followersByUser.find(artistic => artistic.artist.artistic_name === artist)
  
})
  </script>
<template>
  <div :style="{
      backgroundImage: `linear-gradient(315deg, rgba(0,0,0, 0.65) 10%, rgba(0,0,0,1) 65%), url(${ArtistStore.artistsByName[0]?.user?.background_image?.url})`}"
    style="background-repeat: no-repeat; background-size: cover; background-attachment: fixed;">
    <GlobalBlur :light_color="ArtistStore.artistsByName.user?.background_light_color" :dark_color="ArtistStore.artistsByName[0]?.user?.background_dark_color"/>
    <div class="z-20 relative">
      <FollowArtist :artistic_name="ArtistStore.artistsByName[0]?.artistic_name" :UserIsFollowing="UserIsFollowing" :artist="artist"/>
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
      <div class="p-5">
        <DiscographyArtist :discography="SongStore.songsByArtist"/>
      </div>
      <div class="p-5">
        <CommunityArtist :artistcommunity="CommunityStore.communitysByAutor" @entercom="enterCommunity"/>
      </div>
      <div class="w-full flex p-5 justify-center items-center">
        <BiographyArtist :perfil="ArtistStore.artistsByName[0]?.user?.perfil?.url" :description="ArtistStore.artistsByName[0]?.user?.description"/>
      </div>
    </div>
  </div>
</template>