<script setup>
import router from '@/router';
import ButtonGlobal from '../global/ButtonGlobal.vue';
import createsongs from '@/assets/images/createsongs.png'
import manplaysguitar from '@/assets/images/manplaysguitar.png'

defineProps({
    IsArtist: {
        type: Boolean,
        required: true
    }
})
</script>
<template>
    <div class="flex justify-center items-center p-5 flex-col h-full">
        <h1 class="text-center text-5xl text-white">{{IsArtist ? 'Painel de Artista' : 'Seja um Artista' }}</h1>
        <div class="w-full flex justify-center items-center">
            <div class="flex justify-center md2:flex-col md2:p-5 md2:gap-5 items-center p-10 gap-20">
                <img :src="IsArtist ? createsongs : manplaysguitar"  class="h-96 w-[500px] md2:h-72 rounded-xl">
                <h2 class="text-white text-2xl w-2/4 md2:w-full md2:text-justify">{{ IsArtist ? 'Lance suas músicas e albuns que desejar, aqui no painel do artista você escolhe quem vai para a lua com suas músicas' : 'No Mooner, sua música brilha: mais renda, conexão direta com fãs, liberdade criativa total e dados poderosos para impulsionar sua carreira. Aqui, você é prioridade, não estatística.'}}</h2>
            </div>
        </div>
        <div class="flex justify-center items-center  w-full">
            <ButtonGlobal :title=" IsArtist ? 'Acessar Painel' : 'Ser um Artista'" background="purple" width="250px" font_size="15px" border_radius="20px" color="white" padding="12px" @click="IsArtist  ? router.push('/artistpainel/') : router.push('/beanartist/')"/>
        </div>
    </div>  
</template>