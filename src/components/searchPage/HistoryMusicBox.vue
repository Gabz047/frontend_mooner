<script setup>
    import { adjusteSize } from '@/utils/music/music';
    defineProps({
        history: {
            type: Object,
            Required: true
        }
    })
</script>
<template>
        <div class="w-80 rounded-xl p-2 flex gap-3 items-center justify-center bg-zinc-800">
            <div class="flex items-center w-full gap-5 h-full">
                <div class="h-full">
                    <img class="w-24 rounded-sm " src="../../assets/images/imagemdefundoregistro.png">
                </div>
                <div class="flex flex-col gap-3 justify-center">
                    <p class="font-semibold text-lg text-white">{{ adjusteSize(history.title, 18, 18) }}</p>
                    <p class="text-base text-white">{{history.artist}}</p>
                </div>
            </div>
            <div >
                <h1 class="text-white text-start cursor-pointer text-lg font-bold" @click="$emit('deletesong')">X</h1>
            </div>
        </div>
</template>