<script setup>
import PlaylistBox from './PlaylistBox.vue'
import FollowingBox from './FollowingBox.vue'
import CommunityBox from './CommunityBox.vue'
import { data_header_icons, selectIcon, returnActive } from '@/utils/music/music'
import LunaIA from './LunaIA.vue'
import { computed } from 'vue';
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


 
</script>
<template>
  <section class="my-auto ml-2 max-h-full h-full  overflow-auto rounded-lg bg-[#121212] p-5" >
    <div class="w-full flex justify-between">
      <img class="h-12" src="@/assets/images/Logo.png" alt="" />

      <div class="flex flex-col gap-1">
        <img
          v-for="(item, index) in data_header_icons"
          :class="['w-7 h-[29px]', item.active ? ' rounded-lg' : ' brightness-[30%]']"
          :src="item.icon"
          :key="index"
          alt="" @click="selectIcon(item)"
        />
      </div>
    </div>

    <div v-if="returnActive == 'home'">
    <p class="text-xl text-white">Playlists</p>
    <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
      <PlaylistBox :playlists="props.data_playlist" />
    </div>

    <p class="text-xl mt-5 text-white">Seguindo</p>
    <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
      <FollowingBox :data_following="props.data_following" />
    </div>

    <p class="text-xl mt-5 text-white">Comunidades</p>
    <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
      <CommunityBox :data_community="props.data_community" />
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
