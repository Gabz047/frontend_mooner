<script setup>
import PlaylistBox from './PlaylistBox.vue';
import FollowingBox from './FollowingBox.vue';
import CommunityBox from './CommunityBox.vue';
const props = defineProps({
    data_header: {
        type: Object,
    },
})
</script>
<template>
    <section class="my-auto ml-2 h-[95%] overflow-auto rounded-lg w-[20%] bg-[#121212] p-5">
        <p class="text-xl text-white">Playlists</p>
        <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
          <PlaylistBox :playlists="data_header.playlists" />
        </div>

        <p class="text-xl mt-5 text-white">Seguindo</p>
        <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
          <FollowingBox :data_following="data_header.following" />
        </div>

        <p class="text-xl mt-5 text-white">Comunidades</p>
        <div class="w-full gap-3 flex flex-col mt-5 max-h-[320px] overflow-auto">
          <CommunityBox :data_community="data_header.community" />
        </div>
    </section>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 3px;               /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background-color: transparent;  
  border-radius: 20px;      /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: transparent;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
}
</style>