<script setup>
const props = defineProps({
    width: {
        type: String,
        default: 'w-full'
    },
    justify: {
        type: String,
        default: 'justify-start'
    },
    height:{
        type: String,
        default: 'h-full'
    },
    title: {
        type: String
    },
    is_history_page:{
        type: Boolean,
        required: false
    },
    justify_div: {
        type: String,
        default: 'justify-between'
    },

})
</script>
<template>
<main  class="flex min-h-[31dvh] overflow-auto p-3 justify-center lg:justify-center overflow-x-auto">
    <h2 class="ml-6 text-white text-xl w-full" v-if="!is_history_page">{{ props.title }}</h2>
    <div :class="`flex ${props.justify} ${props.width} ${props.height} gap-3 p-2 ${props.justify_div}`"><slot></slot></div>   
</main>
</template>