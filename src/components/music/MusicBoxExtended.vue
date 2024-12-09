<script setup>
const props = defineProps({
    data: {
        type: Object
    }
})
const emits = defineEmits([
    'addToSearch'
])
</script>
<template>
    <div @click="emits('addToSearch', props.data )" class=" w-[90%] items-center px-2 duration-300 text-white h-[55px] ml-3 flex justify-start hover:bg-[rgba(28,28,28,0.6)] rounded-lg">
        <div class="w-[43px] h-[43px]">
            <img class="w-full h-full rounded-xl object-cover" :src="props.data.cover.url" alt="">
        </div>
        <div class="h-full flex flex-col justify-center ml-2">
            <p v-for="artists in props.data.artists" class=" text-xs font-light">{{artists.artistic_name}}</p>
            <p class="text-lg font-medium">{{props.data.title}}</p>
        </div>
    </div>
</template>