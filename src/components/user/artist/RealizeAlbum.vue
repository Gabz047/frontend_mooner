<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import PerfilPhoto from './PerfilPhoto.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import RealizeSong from './RealizeSong.vue';
import { useAlbumStore} from '@/stores';
const AlbumStore = useAlbumStore()

defineProps({
        fields: {
            type: Array,
            required: true
        },
    })
</script>
<template>
<div class="w-full flex justify-center">
    <div class="w-2/5 flex flex-col justify-center items-center gap-5 " v-if="!AlbumStore.state.albumcreated">
        <PerfilPhoto :is-album="true" :is_music="false"/>
        <InputGlobal container_class="artist-fields-container" v-model:value="AlbumStore.state.name" maxlength="50" field_name="nome do seu album"/>
        <ButtonGlobal title="Criar Album" background="#6340AE" color="white" width="350px"
        border_radius="10px" font_size="20px" padding="15px" class="font-extralight" @click="AlbumStore.state.albumcreated = !AlbumStore.state.albumcreated"/>
    </div>
    <div v-else>
        <RealizeSong :err="AlbumStore.err" :msg="AlbumStore.msg" :create_song_function="SongStore.CreateNewSongForAlbum" :is_album="true" :fields="fields"/>
    </div>
</div>
</template>