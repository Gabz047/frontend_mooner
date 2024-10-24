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
    },
    has_active_bg: {
        type: Boolean,
        default: false
    },
})
</script>
<template>
    <span @click="emits('goSection')" :class="props.active ? 'font-semibold' : 'font-light', props.has_active_bg ? props.active ? 'bg-[#242424]' : 'bg-none' : 'bg-[#242424]' " class="px-3 py-1 text-white rounded-xl cursor-pointer">{{ props.title }}</span>
</template>