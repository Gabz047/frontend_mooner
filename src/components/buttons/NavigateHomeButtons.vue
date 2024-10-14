<script setup>
const emits = defineEmits([
    'goSection'
])

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <span @click="emits('goSection')" :class="props.active ? 'font-bold' : 'font-light'" class="px-3 py-1 text-white bg-[#242424] rounded-xl">{{ props.title }}</span>
</template>