<script setup>
import router from '@/router';
import ButtonGlobal from '../global/ButtonGlobal.vue';
</script>
<template>
    <div class="flex justify-center items-center flex-col h-full">
        <h1 class="text-center text-5xl text-white">Seja um Artista</h1>
        <div class="w-full flex justify-center items-center">
            <div class="flex justify-center items-center p-10 gap-20">
                <img src="../../assets/images/manplaysguitar.png" width="500" class="h-96 rounded-xl">
                <h2 class="text-white text-2xl w-2/4">No Mooner, sua música brilha: mais renda, conexão direta com fãs, liberdade criativa total e dados poderosos para impulsionar sua carreira. Aqui, você é prioridade, não estatística.</h2>
            </div>
        </div>
        <div class="flex justify-center items-center  w-full">
            <ButtonGlobal title="Ser um Artista" background="purple" width="250px" font_size="15px" border_radius="20px" color="white" padding="12px" @click="router.push('/beanartist/')"/>
        </div>
    </div>  
</template>