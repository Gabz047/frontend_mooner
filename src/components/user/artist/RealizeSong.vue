<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import PerfilPhoto from './PerfilPhoto.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import { onMounted } from 'vue';
import { useGenreStore } from '@/stores/genre/genre';
import { useSongsStore } from '@/stores/songs/songs';
import { useArtistProgress, useDocumentStore } from '@/stores';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';
const GenreStore = useGenreStore()
const ArtistProgressStore = useArtistProgress()
const SongsStore = useSongsStore()

defineProps({
    fields:{
        type: Array,
        required: true
    }
})

function Finished(err){
    if(!err){
        SongsStore.msg = null
        SongsStore.realized_first_song.is_realized = true
        router.push('/')
    }
    else{
        SongsStore.msg = null
    }
}

onMounted(async () =>{
    ArtistProgressStore.state.artist_create_song_fields[1].options = await GenreStore.GetGenre()
})
</script>
<template>
    <div class="w-screen gap-8 flex flex-col justify-center items-center">
        <div class="flex justify-center items-center w-full">
            <PerfilPhoto :is_music="true"/>
            <div class="flex flex-col items-center w-2/4">
                <InputGlobal v-for="input, index in fields" :key="index" container_class="artist-fields-container" :field_name="input.fieldname"  :type="input.type" :is_required="input.required" :options="input.options"  v-model:value="input.value"/>
            </div>
        </div>
        <ButtonGlobal  title="enviar" background="purple" color="white" width="150px" border_radius="10px" font_size="17px" @click="SongsStore.CreateNewSong"/>
        <MsgGlobal v-show="SongsStore.msg" :msg="SongsStore.msg" :err="SongsStore.err" @confirm="Finished"/>
    </div>
</template>