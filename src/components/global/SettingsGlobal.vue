<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
</script>
<template>
<div class=" w-52 bg-[#313131] p-2 rounded-xl absolute z-30 top-16 right-0">
 <div v-for="item, index in data" :key="index" class="w-full flex h-10 justify-between items-center cursor-pointer rounded-md p-1 hover:bg-[#3a3a3a]">
    <p class=" text-base text-white">{{ item.tittle }}</p>
    <img :src="item.img" class="w-6 h-6">
 </div>
</div>
</template>