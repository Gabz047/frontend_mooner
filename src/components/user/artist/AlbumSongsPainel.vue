<script setup>
    defineProps({
        file: {
            type: String,
            required: true
        },
        songs: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    })
</script>   
<template>
<div class="w-full flex flex-col">
    <div class="w-[400px]  flex flex-col gap-5 justify-center items-center">
        <div>
            <img :src="file" class="w-60 h-60">
            <p class="text-2xl text-center text-white font-extralight p-2">{{ name }}</p>
        </div>
        <div class="bg-black border w-full overflow-auto h-96">
            <div class="text-white flex gap-2 p-3" v-for="song in songs" :key="song.id">
                <img class="w-16 h-16" :src="file">
                <p class="text-lg text-center">{{ song.title }}</p>
            </div>
        </div>
    </div>
</div>
</template>