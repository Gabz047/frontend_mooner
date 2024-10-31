<script setup>
import { onMounted} from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore, usePlaylistStore, useLoginStore } from '@/stores';

const userStore = useUserStore()
const playlistStore = usePlaylistStore()
const loginStore = useLoginStore()

// router.beforeEach((to, from, next) => {
//   if (to.path == '/login' ||)
// })

  onMounted(async()=>{
    await userStore.getUser(loginStore.access)
    console.log(userStore.myuser)
    await playlistStore.getPlaylistsByOwner(userStore.myuser.email, loginStore.access)
  })
</script>
<template>
  <RouterView />
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
  }
</style>

