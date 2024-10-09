<script setup>
const props = defineProps({
    width: {
        type: String,
        default: 'w-full'
    }
})
</script>
<template>
<main :class="`flex ${props.width} flex-wrap gap-7 p-3`">
    <slot></slot>
</main>
</template>