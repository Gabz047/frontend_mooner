<script setup>
const props = defineProps({
    data: {
        type: Object
    },
    active: {
        type: Boolean
    }
})

const emits = defineEmits([
    'action'
])
</script>
<template>
    <span @click="emits('action', props.data.description)" :class="`border-2 ${props.active ? 'border-[#2E0F71]' : 'border-white'} cursor-pointer select-none flex min-w-28 justify-center items-center py-[0.9px] text-[17px] rounded-2xl duration-200 text-white hover:border-2 ${props.active ? 'bg-[#2E0F71]' : ''} ${props.active ? '' : 'hover:text-black'} ${props.active ? '' : 'hover:border-black'} ${props.active ? '' : 'hover:bg-white'}`">
        <p>{{ props.data.description }}</p>
    </span>
</template>