<script setup>
    import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
    import { useArtistStore, useFollowingStore } from '@/stores';
    import { useLoginStore, usePlaylistStore } from '@/stores';
import { onMounted, onUnmounted } from 'vue';
    const FollowingStore = useFollowingStore()
    const LoginStore  = useLoginStore()
    const ArtistStore = useArtistStore()
    const playlistStore = usePlaylistStore()
    const emits = defineEmits([
        'edit', 'save'
    ])
    const props = defineProps({
        title: {
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
        },
        isOwner: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean
        }
    }) 



</script>
<template>
    <div class="w-full flex justify-between p-5 items-center">
        <h1 class="text-white text-6xl font-semibold ms-3">{{ props?.title }}</h1>
        <ButtonGlobal :title="props.isEdit ?'Salvar' : 'Editar'" border="1px solid white" width="150px" border_radius="20px" color="white"
          padding="5px" class="me-32" @click="emits(props.isEdit ?'save' : 'edit')" />
      </div>
</template>