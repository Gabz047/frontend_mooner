<script setup>
    import { filterClasses } from '@/utils/artist/process_func';
    defineProps({
        progress:{
            type: Array,
            required: true
        }
    })
</script>
<template>
<div class="flex w-full justify-center items-center absolute top-16" >
    <div v-for="process, index in progress" :key="index" class="flex gap-5 justify-center items-center   p-5">
        <div class="flex flex-col justify-center items-center h-full gap-1" >
            <div :class="process.is_activate ? 'bg-purple-600 rounded-full w-16 h-16 flex justify-center items-center mb-3' : 'bg-zinc-800 rounded-full w-16 h-16 flex justify-center items-center'" @click="is_activate(index)">
                <img :src="process.img" >
            </div> 
            <div class="bg-zinc-500 rounded-full w-5 h-5 gap-2 flex flex-col items-center cursor-pointer absolute mt-32 question">
                <p class="text-black text-center ">?</p>
                <div class="coment relative bg-zinc-500 w-36 flex flex-col justify-center items-center rounded-xl p-3 text-[9px]">
                    <div class="bg-zinc-500 rounded-ee-full rounded-ss-full rounded-es-full w-10 h-10 absolute bottom-6 z-10 -rotate-45 left-13 "></div>
                    <p class="text-white z-20">{{process.hint}}</p>
                </div>
            </div>
        </div>
        <div class="flex gap-4 ml-6" >
            <div v-for="i in 5" :key="i" :class="filterClasses(i, process.is_activate)" v-if="index < 2"></div> 
        </div>
    </div>
</div>
</template>
<style scoped>
    .coment{
        display: none;
    }
    .question:hover .coment{
        display: flex;
    }
    .mdi-check{
        position: absolute;
        font-size: 40px;
    }
    .mdi-magnify{
        position: absolute;
        font-size: 35px;
        margin-top: 10px;
        margin-left: 12px;
    }
</style>