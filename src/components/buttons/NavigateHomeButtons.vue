<script>
const emits = defineEmits([
    'goSection'
])

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <span @click="emits('goSection')" :class="props.active ? 'font-bold' : 'font-normal'" class="px-5 py-2 text-white bg-[#242424] rounded-xl">Músicas</span>
</template>