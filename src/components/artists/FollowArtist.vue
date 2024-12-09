<script setup>
    import ButtonGlobal from '../global/ButtonGlobal.vue';
    import { useArtistStore, useFollowingStore } from '@/stores';
    import { useLoginStore } from '@/stores';
    const FollowingStore = useFollowingStore()
    const LoginStore  = useLoginStore()
    const ArtistStore = useArtistStore()

    const props = defineProps({
        artistic_name: {
            type: String,
            required: true
        },
        UserIsFollowing:  {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        }
    })

    async function FolloworUnfollow() {
    const index = FollowingStore.followersByUser.findIndex(artistic => artistic.artist.artistic_name === props.artist)
    if(props.UserIsFollowing){
      await FollowingStore.deleteFollow(props.UserIsFollowing.id, index, LoginStore.access)
      location.reload()
    }
    else{
      await FollowingStore.createFollow({user: LoginStore.user.email, artist: ArtistStore.artistsByName[0]?.user?.email }, LoginStore.access)
      location.reload()
    }   
} 

</script>
<template>
    <div class="w-full flex justify-between p-5 items-center">
        <h1 class="text-white text-6xl font-semibold ms-3">{{ artistic_name }}</h1>
        <ButtonGlobal :title="UserIsFollowing ? 'Deixar de Seguir' : 'Seguir' " border="1px solid white" width="150px" border_radius="20px" color="white"
          padding="5px" class="me-32" @click="FolloworUnfollow" />
      </div>
</template>