<script setup>
import ButtonGlobal from '../global/ButtonGlobal.vue';
defineProps({
    artistcommunity: {
        type: Array,
        required: true
    }
})
</script>
<template>
    <h1 class="text-white font-bold text-3xl">Comunidade</h1>
    <div class="flex w-full p-5" v-if="artistcommunity">
        <div v-for="community in artistcommunity" :key="community.id" class="flex  w-full gap-10">
            <img :src="community.cover?.url" width="500" />
            <div class="flex flex-col w-full gap-5">
                <h1 class="text-white text-5xl">{{ community.name }}</h1>
                <p class="text-white text-lg">{{ community.description }}</p>
                <div class="flex justify-center items-center w-full">
                    <ButtonGlobal title="Entrar" border="1px solid white" width="150px" border_radius="20px"
                        color="white" padding="5px" class="me-32" @click="$emit('entercom', community.id)"/>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>Este Artista ainda não possui communidade</h1>
    </div>
</template>