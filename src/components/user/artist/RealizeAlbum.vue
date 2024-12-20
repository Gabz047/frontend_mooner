<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import PerfilPhoto from './PerfilPhoto.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import RealizeSong from './RealizeSong.vue';
import { useAlbumStore } from '@/stores/mooner/albuns';
import {  useSongStore } from '@/stores';
import { useArtistProgress } from '@/stores';
const AlbumStore = useAlbumStore()
const SongStore = useSongStore()
const ArtistProgressStore = useArtistProgress()
defineProps({
        fields: {
            type: Array,
            required: true
        },
    })

    async function CreateSongForAlbum(token, artist){
        const songcreated = await SongStore.createSongForAlbum(ArtistProgressStore.state.artist_create_song_fields[0].value, ArtistProgressStore.state.artist_create_song_fields[1].value, ArtistProgressStore.state.artist_create_song_fields[2].value, token, artist)
        if(songcreated){
            AlbumStore.stateStorage.songs.push(songcreated)
            ArtistProgressStore.state.artist_create_song_fields[0].value = ''
            ArtistProgressStore.state.artist_create_song_fields[1].value = ''
            ArtistProgressStore.state.artist_create_song_fields[2].value = ''
            location.reload()
        }
    }
</script>
<template>
<div class="w-full flex justify-center">
    <div class="w-2/5 flex flex-col justify-center items-center gap-5 " v-if="!AlbumStore.stateStorage.albumcreated">
        <PerfilPhoto :is-album="true" :is_music="false"/>
        <InputGlobal container_class="artist-fields-container" v-model:value="AlbumStore.stateStorage.name" maxlength="50" field_name="nome do seu album"/>
        <ButtonGlobal title="Criar Album" background="#6340AE" color="white" width="350px"
        border_radius="10px" font_size="20px" padding="15px" class="font-extralight" @click="AlbumStore.stateStorage.albumcreated = !AlbumStore.stateStorage.albumcreated"/>
    </div>
    <div v-else>
        <RealizeSong :err="AlbumStore.err" :msg="AlbumStore.msg" @createsong="CreateSongForAlbum" :is_album="true" :fields="fields"/>
    </div>
</div>
</template>