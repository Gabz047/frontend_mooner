<script setup>
import { ref } from 'vue';
import { filterclasses, textfilter } from '@/utils/artist/artistfilters';
    const image = ref(null)
    const audio = ref(null)
    const musicerrmsg = ref(null)
    const imageerrmsg = ref(null)
    function changefile(e){
        const file = e.target.files[0]
        if(file.type !== "audio/mpeg"){
            image.value = URL.createObjectURL(file)
            imageerrmsg.value = ''
        }
        else{
            imageerrmsg.value = 'arquivo incompativel'
        }   
    }
    function changeaudio(e){
        const file = e.target.files[0]
        if(file.type ===  "audio/mpeg"){
            audio.value = URL.createObjectURL(file)
            musicerrmsg.value = ''
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
            <span v-if="!image">+</span>
            <img :src="image" class="w-72 h-80"  v-else>
            <span >{{ imageerrmsg ? imageerrmsg : textfilter(is_music, musicerrmsg) }}</span>
        </div>
    </label>
    <label for="audio" v-if="is_music">
        <div :class=" musicerrmsg? 'flex flex-col text-red-500 size-7 w-full h-full justify-center items-center gap-5' : 'flex flex-col text-white size-7 w-full h-full justify-center items-center gap-5'" >
            <span v-if="!audio">+</span>
            <audio v-else :src="audio" controls></audio>
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