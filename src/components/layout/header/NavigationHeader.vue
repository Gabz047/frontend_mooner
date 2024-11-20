<script setup>
import PlaylistBox from './PlaylistBox.vue'
import FollowingBox from './FollowingBox.vue'
import CommunityBox from './CommunityBox.vue'
import { data_header_icons, selectIcon, returnActive } from '@/utils/music/music'
import LunaIA from './LunaIA.vue'
import { computed, onMounted, reactive } from 'vue';
import { usePlaylistStore, useLoginStore, useUserStore, useCommunityStore, useQueueStore, useImgStore} from '@/stores'
import router from '@/router'

const userStore = useUserStore()
const playlistStore = usePlaylistStore()
const loginStore = useLoginStore()
const communityStore = useCommunityStore()
const queueStore = useQueueStore()
const imgStore = useImgStore()

const token = loginStore.access
const user = userStore.myuser
const props = defineProps({
  data_playlist: {
    type: Array
  },
  data_community: {
    type: Array
  },
  data_following: {
    type: Array
  }
})

const playlistBody = reactive({
  name: `Playlist de ${user.email}`,
  owners: [user.email],
  songs: [],
  cover: '03436249-13fe-4bc7-b994-1bdedce1e991'
})

const communityBody = reactive({
  name: `Comunidade de ${user.email}`,
  description: `Seja bem vindo a comunidade de ${user.email}`,
  autor: user.email,
})

const createPlaylist = async (playlist, token) => {
  await playlistStore.createPlaylist(playlist, token)
  window.location.reload()
}

const createCommunity = async (community, token) => {
  communityStore.createCommunity(community, token)
}

 
</script>
<template>
  <section class="my-auto border-r border-none overflow-auto rounded-lg bg-[#121212] p-5" :class="queueStore.state?.currentSong ? 'h-[90%]' : 'h-full' " >  
    <div class="w-full flex justify-between">
      <RouterLink to="/">
      <img class="h-12" src="@/assets/images/Logo.png" alt="" />
    </RouterLink>
      <div class="flex flex-col gap-1">
      <div @click="selectIcon(item)" v-for="(item, index) in data_header_icons">
        <img
          
          :class="['w-7 h-[29px]', item.active ? '' : ' brightness-[30%]']"
          :src="item.icon"
          :key="index"
          alt=""
        />
      </div>
      </div>
    </div>

    <div v-if="returnActive == 'home'">
    <p class="text-xl text-white">Playlists</p>
    <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
      <PlaylistBox @create="createPlaylist(playlistBody, token)" :playlists="props.data_playlist" />
    </div>

    <p class="text-xl mt-5 text-white">Seguindo</p>
    <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
      <FollowingBox :data_following="props.data_following" />
    </div>

    <p class="text-xl mt-5 text-white">Comunidades</p>
    <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
      <CommunityBox @create="createCommunity(communityBody, token)" :data_community="props.data_community" />
    </div>
  </div>

  <div class="flex h-[80%] mt-12" v-else>
  <LunaIA class="w-full h-full " />
  </div>
  </section>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 3px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 20px; /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: transparent; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}
</style>
