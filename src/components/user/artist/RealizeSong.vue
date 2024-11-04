<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import PerfilPhoto from './PerfilPhoto.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import { onMounted } from 'vue';
import { useGenreStore } from '@/stores/genre/genre';
import { useAlbumStore, useArtistProgress, useLoginStore, useSongStore } from '@/stores';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';
import FeatInput from './FeatInput.vue';
import AlbumSongsPainel from './AlbumSongsPainel.vue';
const GenreStore = useGenreStore()
const ArtistProgressStore = useArtistProgress()
const SongsStore = useSongStore()
const AlbumStore = useAlbumStore()
const LoginStore = useLoginStore()
const props = defineProps({
    fields: {
        type: Array,
        required: true
    },
    is_album:{
        type: Boolean,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    err: {
        type: Boolean,
        required: true
    },
    create_song_function: {
        type: Function,
        required: true
    }
})

function Finished(err) {
    if (!err && !props.is_album) {
        SongsStore.msg = null
        ArtistProgressStore.state.progress_artist[2].is_activate = true
        router.push('/')
    }
    else if(!err && props.is_album){
        AlbumStore.msg = null
        ArtistProgressStore.state.progress_artist[2].is_activate = true
        router.push('/')
    }
    else {
        SongsStore.msg = null
        AlbumStore.msg = null
    }
}

onMounted(async () => {
    ArtistProgressStore.state.artist_create_song_fields[1].options = await GenreStore.GetGenre(LoginStore.access)
})
</script>
<template>
    <div class="flex w-full flex-col">
        <div class="flex w-screen justify-center gap-28 items-center">
            <div class="flex flex-col gap-3 w-7/12  justify-center items-center">
                <div class="flex justify-center items-center gap-20 p-5 w-full">
                    <PerfilPhoto :is-album="is_album" :is_music="true" />
                    <div class="flex flex-col items-center w-3/4">
                        <InputGlobal v-for="input, index in fields" :key="index"
                            container_class="artist-fields-container" :field_name="input.fieldname" :type="input.type"
                            :is_required="input.required" :options="input.options" v-model:value="input.value" :multiple="input.multiple"/>
                        <FeatInput/>
                    </div>
                </div>
                <ButtonGlobal title="Enviar música" background="#6340AE" color="white" width="350px"
                    border_radius="10px" font_size="17px" @click="$emit('createsong', LoginStore.access, LoginStore.user.email)" />
            </div>
            <div class="w-[350px] flex flex-col items-center gap-20" v-if="!is_album">
                <h1 class="text-start text-white text-4xl">Aqui suas músicas alcançam até a lua!</h1>
                <img class="w-full" src="../../../assets/images/mooner_music.png">
            </div>
            <div class="flex flex-col gap-3 justify-center items-center" v-else>
                <AlbumSongsPainel :file="AlbumStore.state.file" :name="AlbumStore.state.name" :songs="AlbumStore.state.songs"/>
                <ButtonGlobal title="Finalizar album" background="#6340AE" color="white" width="350px"
                border_radius="10px" font_size="17px" @click="AlbumStore.CreateNewAlbum(LoginStore.access, LoginStore.user.email)"/>
            </div>
            </div>
        </div>
        <MsgGlobal v-show="msg" :msg="msg" :err="err" @confirm="Finished" />
</template>