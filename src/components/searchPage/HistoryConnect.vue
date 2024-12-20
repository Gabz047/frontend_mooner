<script setup>
import router from '@/router';
defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <div class="w-100 flex justify-end p-5 mr-4">
        <div class="bg-zinc-800 flex justify-center cursor-default items-center  gap-3 w-28 rounded-3xl p-2 "  @click="router.push({name: title})">
            <h1 class=" text-white">{{title}}</h1>
        </div>  
    </div>
</template>