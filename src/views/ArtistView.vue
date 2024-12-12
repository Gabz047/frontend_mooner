<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAlbumStore, useArtistStore, useLoginStore, useSongStore, useFollowingStore, useCommunityStore } from '@/stores';
import { useRoute } from 'vue-router';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import FollowArtist from '@/components/artists/FollowArtist.vue';
import DiscographyArtist from '@/components/artists/DiscographyArtist.vue';
import BiographyArtist from '@/components/artists/BiographyArtist.vue';
import GlobalBlur from '@/components/global/GlobalBlur.vue';
import CommunityArtist from '@/components/artists/CommunityArtist.vue';
import MusicBoxCard from '@/components/music/MusicBoxCard.vue';
import router from '@/router';
import GenreContainer from '@/components/music/FilterComponents/GenreContainer.vue';
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
  await AlbumStore.getAlbunsByAutor(artist, LoginStore.access)
  console.log(AlbumStore.albunsByAutor)
  await CommunityStore.getCommunitysByAutor(artist, LoginStore.access)
  UserIsFollowing.value = FollowingStore.followersByUser.find(artistic => artistic.artist.artistic_name === artist)
})

// onUnmounted(()=>{
//   AlbumStore.albunsByAutor = []
// })
  </script>
<template>
  <div :style="{
      backgroundImage: `linear-gradient(315deg, rgba(0,0,0, 0.65) 10%, rgba(0,0,0,1) 65%), url(${ArtistStore.selectedArtist?.user?.background_image?.url})`}"
    style="background-repeat: no-repeat; background-size: cover; background-attachment: fixed;">
    <GlobalBlur :light_color="ArtistStore?.artistsByName.user?.background_light_color" :dark_color="ArtistStore.selectedArtist?.user?.background_dark_color"/>
    <div class="z-20 relative">
      <FollowArtist :email="ArtistStore.selectedArtist.user.email" :artistic_name="ArtistStore.selectedArtist?.artistic_name" :UserIsFollowing="UserIsFollowing" :artist="artist"/>
      <div class="flex items-center w-full gap-20 p-5">
        <img :src="ArtistStore.selectedArtist?.user?.perfil?.url" width="200" class="rounded-full object-cover h-[200px] mt-8">
        <div class="flex flex-col gap-4 mt-5 w-full">
          <div class="flex justify-between items-center w-full">
            <h1 class="text-xl text-white font-bold">Albuns</h1>
          </div>
          <GenreContainer Height="h-[200px]" :activeleft="AlbumStore.toLeft > 0 ? true : false" :activeRight="AlbumStore.toLeft < 500 ? true : false" @left="AlbumStore.toLeft <= 0 ? '' : AlbumStore.toLeft -= 188" @right="AlbumStore.toLeft >= 500 ? '' : AlbumStore.toLeft += 188"  v-if="AlbumStore.albunsByAutor.length > 0">
            <MusicBoxCard type="Álbuns" v-for="albuns in AlbumStore.albunsByAutor" :data="albuns"/>
          </GenreContainer>
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
        <BiographyArtist :perfil="ArtistStore.selectedArtist?.user?.perfil?.url" :description="ArtistStore.artistsByName?.user?.description"/>
      </div>
    </div>
  </div>
</template>