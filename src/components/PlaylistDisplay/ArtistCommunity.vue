<script setup>
import { onMounted } from 'vue';
import ButtonGlobal from '../global/ButtonGlobal.vue';
import CommunityPostShowCase from './CommunityPostShowCase.vue';
const widthScreen = window.innerWidth

const props = defineProps({
    data: {
        type: Object
    },
    data_posts: {
        type: Array
    }
})

</script>
<template>
    <section class="w-full p-3 flex flex-col justify-center">
        <h2 class="text-white text-3xl font-semibold">Comunidade</h2>
       
            <div class="w-full flex justify-between relative mt-2 lg:mt-2">
                <div class="absolute z-10 w-full h-full flex flex-col justify-center overflow-hidden">
                    <div class=" w-full h-full lg:h-[110%] bg-black absolute top-0 opacity-[80%]  overlay"></div>
                    <img :src="props.data?.cover?.url" class="w-full rounded-md" alt="">
                </div>
                <div class="w-full flex justify-between relative z-50 lg:flex-col lg:items-center lg:gap-3">
            <div class=" h-40 w-[40%] lg:w-[75%] lg:h-64 flex flex-col lg:mt-3 justify-center rounded-md">
                <img class="w-full ml-2 rounded-xl h-4/5 lg:h-full" :src="props.data?.cover?.url">
            </div>
            <div class="h-full w-[59%] lg:w-full flex flex-col text-white items-center justify-center gap-3 p-2" >
                <p class="text-xl lg:text-2xl">{{ props.data?.name }}</p>
                <p class="text-justify lg:text-center w-[90%] lg:w-[80%] lg:text-lg">{{ props.data?.description }}</p>
                <ButtonGlobal
              title="Entrar"
              background="#6340AE"
              border_radius="10px"
              color="white"
              :padding="widthScreen > 1024 ? '5px 20px 5px 20px' : '8px 35px 8px 35px'"
            />
            </div>
            </div>
            </div>
   
        <div class="flex min-w-full gap-4 overflow-auto lg:flex-wrap lg:gap-2 lg:justify-center">
            <CommunityPostShowCase v-for="community in props.data_posts" :data="community" />
        </div>
    </section>
</template>
