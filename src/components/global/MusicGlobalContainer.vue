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
    title: {
        type: String
    }
})
</script>
<template>
<main class="flex flex-wrap gap-7 p-3">
    <h2 class="ml-6 text-white text-xl w-full">{{ props.title }}</h2>
    <div :class="`flex ${props.justify} ${props.width} flex-wrap gap-10`"><slot ></slot></div>
    
</main>
</template>