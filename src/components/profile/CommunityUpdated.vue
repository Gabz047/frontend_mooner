<script setup>
import router from '@/router';
import ButtonGlobal from '../global/ButtonGlobal.vue';
import { useCommunityStore, useLoginStore } from '@/stores';

const CommunityStore = useCommunityStore()
const LoginStore = useLoginStore()

    defineProps({
        photo: {
            type: URL,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    })
</script>
<template>
    <div>
        <h1 class="text-center text-white text-5xl">Sua Comunidade</h1>
        <div class="flex flex-col p-5 gap-5 justify-center items-center">
            <img :src="photo" width="600" class="rounded-lg"/>
            <p class="text-white text-4xl text-center">{{ name }}</p>
        </div>
        <div class="w-full flex p-5 gap-5 justify-center items-center">
            <ButtonGlobal title="Ver Comunidade" background="#282828" color="white" border_radius="10px" @click="router.push(`/community/${id}/`)"/>
            <ButtonGlobal title="Excluir Comunidade" background="red" color="white" border_radius="10px" @click="CommunityStore.deleteCommunity(id, LoginStore.access),router.push('/')"/>
        </div>
    </div>
</template>