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
<style>
.artist-fields-container{
    position: relative;
    width: 50%;
    margin: 25px 0;
}

.artist-fields-container > input, select{
    width: 100%;
    padding: 5px; 
    border-radius: 10px; 
    background-color: #1f1f1f;
    border: 1px solid;
    color: #fff; 
    font-size: 15px;
    outline: none;
}

.artist-fields-container input::placeholder {
    color: transparent; 
}

.artist-fields-container label {
    position: absolute;
    pointer-events: none;
    font-size: 40px;
}

.artist-fields-container textarea{
    width: 100%;
    padding: 10px; 
    border-radius: 10px; 
    height: 350px;
    background-color: #1f1f1f;
    border: 1px solid;
    color: #fff; 
    font-size: 15px;
    outline: none;
}

.artist-fields-container input + label,
.artist-fields-container input:not(:placeholder-shown) + label,
.artist-fields-container select:not(:placeholder-shown) + label{
    top: 0;
    left: 10px;
    transform: translateY(-100%);
    font-size: 17px;
    color: white
}

</style>