<script setup>
import { ref } from 'vue';
import { filterclasses, textfilter } from '@/utils/artist/artistfilters';
import { useSongsStore } from '@/stores/songs/songs';
import { useDocumentStore, useImgStore } from '@/stores';
    const SongStore = useSongsStore()
    const DocumentStore = useDocumentStore()
    const ImgStore = useImgStore()
    const imageview = ref(null)
    const audioview = ref(null)
    const musicerrmsg = ref(null)
    const imageerrmsg = ref(null)

    async function changefile(e){
        const file = e.target.files[0]
        if(file.type !== "audio/mpeg"){
            imageview.value = URL.createObjectURL(file)
            imageerrmsg.value = ''
            SongStore.newsong.cover = await ImgStore.CreateNewImg(file)
        }
        else{
            imageerrmsg.value = 'arquivo incompativel'
        }   
    }
    async function changeaudio(e){
        const file = e.target.files[0]
        if(file.type === "audio/mpeg"){
            audioview.value = URL.createObjectURL(file)
            musicerrmsg.value = ''
            SongStore.newsong.player = await DocumentStore.CreateNewDoc(file)
        }
        else{
            musicerrmsg.value = 'selecione um arquivo mp3'
        }   
    }
    defineProps({
        is_music: {
            type: Boolean,
            required: true
        }
    })
</script>
<template>
<div class="flex flex-col justify-center items-center gap-20 h-full">
    <label for="perfil" :class="imageerrmsg ? 'w-80 h-80 text-red-500' : filterclasses(is_music, imageerrmsg)" >
        <div class="flex flex-col size-7  w-full h-full justify-center items-center gap-5">
            <span v-if="!imageview">+</span>
            <img :src="imageview" class="w-72 h-80"  v-else>
            <span >{{ imageerrmsg ? imageerrmsg : textfilter(is_music, musicerrmsg) }}</span>
        </div>
    </label>
    <label for="audio" v-if="is_music">
        <div :class=" musicerrmsg? 'flex flex-col text-red-500 size-7 w-full h-full justify-center items-center gap-5' : 'flex flex-col text-white size-7 w-full h-full justify-center items-center gap-5'" >
            <span v-if="!audioview">+</span>
            <audio v-else :src="audioview" controls></audio>
            <span >{{musicerrmsg ? musicerrmsg : 'seu som'}}</span>
        </div>
        <div>
        </div>
    </label>
</div>
    <input type="file" id="perfil" @change="changefile">
    <input type="file" id="audio" @change="changeaudio">
</template>
<style scoped>
    #perfil{
        display: none;
    }
    #audio{
        display: none;
    }
</style>