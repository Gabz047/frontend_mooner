<script setup>
import { adjusteSize } from '@/utils/music/music';
import { usePlaylistStore } from '@/stores';
import router from '@/router';
import { onMounted } from 'vue';

const playlistStore = usePlaylistStore()

    const props = defineProps({
        data: {
            type: Array
        },
        active: {
            type: Boolean
        }
    })

    onMounted(()=>{
        console.log(props.data)
    })

    const to = (id, playlist) => {
  playlistStore.state.selectedPlaylist = {}
  localStorage.removeItem("playlistStorage")
  playlistStore.state.selectedPlaylist = playlist
  playlistStore.newPlaylist.name = playlistStore.selectedPlaylist.name
  playlistStore.newPlaylist.name = playlistStore.selectedPlaylist.name
  playlistStore.newPlaylist.id = playlistStore.selectedPlaylist.id
  playlistStore.newPlaylist.cover = playlistStore.attach ? playlistStore.attach : playlistStore.selectedPlaylist.cover?.attachment_key
  router.push('/playlist/' + id)
}

</script>

<template>
    <div @click="to(item.id, item)" class=" w-full flex mt-3 gap-2 items-center cursor-pointer hover:bg-[#1C1C1C] p-1 rounded-xl" v-for="item in props.data" :key="item.id">

        <div class="ml-10 rounded-lg h-[35px] w-[40px]">
            <img class="w-full h-full rounded-md" :src="item.cover ? item.cover?.url : item.user.perfil?.url">
        </div>
        <p class="text-[15px] text-white" >{{ adjusteSize(item.name ? item.name : item.artist.artistic_name, 23, 23) }}</p>
    </div>    
</template>
